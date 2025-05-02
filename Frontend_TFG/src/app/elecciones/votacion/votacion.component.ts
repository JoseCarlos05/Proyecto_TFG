import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {AlertController, IonicModule} from "@ionic/angular";
import {HeaderComunidadComponent} from "../../header-comunidad/header-comunidad.component";
import {FooterComunidadComponent} from "../../footer-comunidad/footer-comunidad.component";
import {VotoService} from "../../servicios/voto.service";
import {Voto} from "../../modelos/Voto";
import {TipoVoto} from "../../enum/TipoVoto";
import {ActivatedRoute} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {Usuario} from "../../modelos/Usuario";
import {Vecino} from "../../modelos/Vecino";
import {UsuarioService} from "../../servicios/usuario.service";
import {VecinoService} from "../../servicios/vecino.service";
import {Eleccion} from "../../modelos/Eleccion";
import {EleccionesService} from "../../servicios/elecciones.service";

@Component({
    selector: 'app-votacion',
    templateUrl: './votacion.component.html',
    styleUrls: ['./votacion.component.scss'],
    standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    HeaderComunidadComponent,
    FooterComunidadComponent
  ]
})
export class VotacionComponent  implements OnInit {
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string
  idEleccion!: number;
  votoEnCurso: boolean = false;
  yaHaVotado: boolean = false;
  eleccion: Eleccion = {} as Eleccion;
  totalVoto?: number;

  voto: Voto = {
    voto: undefined,
    idEleccion: undefined,
    idVecino: undefined
  }

  constructor(private votoService: VotoService,
              private activateRoute: ActivatedRoute,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private alertController: AlertController,
              private eleccionesService: EleccionesService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.idEleccion = Number(params['id']);
    });
    this.getEleccion()
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<{ tokenDataDTO: TokenDataDTO }>(token);
        const tokenDataDTO = decodedToken?.tokenDataDTO;
        if (tokenDataDTO && tokenDataDTO.correo) {
          this.correo = tokenDataDTO.correo;
          this.cargarUsuario(this.correo);
        }
      } catch (e) {
        console.error('Error al decodificar el token:', e);
      }
    }
    const yaVotado = sessionStorage.getItem(`voto-eleccion-${this.idEleccion}`);
    this.yaHaVotado = yaVotado === 'true';

  }

  cargarUsuario(correo: string): void {
    this.usuarioService.cargarUsuario(correo).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        if (this.usuario && this.usuario.id) {
          this.cargarVecino()
        }
      },
      error: (e) => {
        console.error("Error al cargar el usuario:", e);
      }
    });
  }

  cargarVecino() {
    if (this.usuario.id) {
      this.vecinoService.cargarVecinoPorIdUsuario(this.usuario.id).subscribe({
        next: data => {
          this.vecino = data;
        }
      })
    }
  }

  getEleccion() {
    if (this.idEleccion) {
      this.eleccionesService.getEleccion(this.idEleccion).subscribe({
        next: data => {
          this.eleccion = data;
          this.totalVotoMetodo()
        }
      });
    }
  }

  totalVotoMetodo() {
    if (this.idEleccion) {
      this.eleccionesService.totalVoto(this.idEleccion).subscribe({
        next: data => {
          this.totalVoto = data;
        }
      });
    }
  }

  votar() {
    this.votoService.votar(this.voto).subscribe({
      next: () => {
        console.log('Voto enviado:', this.voto);
        this.votoEnCurso = false;
        this.yaHaVotado = true;
        sessionStorage.setItem(`voto-eleccion-${this.idEleccion}`, 'true');
      },
      error: (e) => {
        console.error('Error al votar:', e);
        this.votoEnCurso = false;
      }
    });
  }

  emitirVoto(tipo: string) {
    if (this.yaHaVotado) {
      this.mostrarAlertaYaHasVotado();
      return;
    }
    if (this.votoEnCurso) {
      return;
    }

    this.votoEnCurso = true;

    const tipoVoto: TipoVoto = TipoVoto[tipo as keyof typeof TipoVoto];

    this.voto = {
      voto: tipoVoto,
      idEleccion: this.idEleccion,
      idVecino: this.vecino.id
    };

    this.confirmarVoto();
  }


  async confirmarVoto() {
    const alert = await this.alertController.create({
      header: 'Confirmar voto',
      message: '¿Estás seguro de que quieres emitir este voto?, ¡solo se puede votar 1 vez!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Voto cancelado');
            this.votoEnCurso = false;
          }
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.votar();
          }
        }
      ]
    });

    await alert.present();
  }
  async mostrarAlertaYaHasVotado() {
    const alert = await this.alertController.create({
      header: 'Ya has votado',
      message: 'Solo puedes votar una vez en esta elección.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }


}

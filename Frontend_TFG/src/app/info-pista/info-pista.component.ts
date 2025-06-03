import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Comunidad} from "../modelos/Comunidad";
import {Gasto} from "../modelos/Gasto";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GastosService} from "../servicios/gastos.service";
import {ViviendaService} from "../servicios/vivienda.service";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {filter} from "rxjs";
import {HeaderComponent} from "../header/header.component";
import {AlertController, IonicModule} from "@ionic/angular";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {HorarioCompleto} from "../modelos/HorarioCompleto";
import {Pista} from "../modelos/Pista";
import {PistaService} from "../servicios/pista.service";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";

@Component({
  selector: 'app-info-pista',
  templateUrl: './info-pista.component.html',
  styleUrls: ['./info-pista.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    HeaderComponent,
    IonicModule,
    MenuInferiorComunidadComponent,
    FooterComunidadComponent,
    NgIf
  ]
})
export class InfoPistaComponent  implements OnInit {
  correo?: string;
  private usuario!: Usuario
  comunidadObjeto!: Comunidad
  listaHorarios: HorarioCompleto[] = []
  idPista!: number;
  pista: Pista = {} as Pista;
  vecino: Vecino = {} as Vecino;
  estadoHorarios: Record<string, 'libre' | 'ocupado' > = {};
  seleccionadas: string[] = [];
  listaHoras: string[] = [];
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];

  constructor(private router: Router,
              private gastosService: GastosService,
              private activateRoute: ActivatedRoute,
              private viviendaService: ViviendaService,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private pistaService: PistaService,
              private alertController: AlertController) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.idPista = Number(params['id']);
      const hoy = new Date().toISOString().split('T')[0];
      this.listarHorarios(hoy);
      this.verPista();
    });

    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
    }

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

  listarHorarios(fecha: string) {
    if (this.idPista) {
      this.pistaService.obtenerHorariosVecino(this.idPista, fecha).subscribe({
        next: data => {
          this.listaHorarios = data.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

          this.listaHoras = this.listaHorarios.map(h => `${h.horaInicio} - ${h.horaFin}`);

          this.estadoHorarios = {};
          this.listaHorarios.forEach(h => {
            this.estadoHorarios[h.id] = h.reservado ? 'ocupado' : 'libre';
          });

          this.seleccionadas = [];
        },
        error: err => {
          console.error('Error al cargar horarios:', err);
        }
      });
    }
  }


  verPista() {
    if (this.idPista) {
      this.pistaService.verPistaVecino(this.idPista).subscribe({
        next: data => {
          this.pista = data;
        }
      });
    }
  }

  getEstadoClase(idHorario: number): string {
    if (this.seleccionadas.includes(String(idHorario))) {
      return 'seleccionado';
    }
    return this.estadoHorarios[idHorario];
  }

  toggleSeleccion(idHorario: number) {
    const idStr = String(idHorario);

    if (this.estadoHorarios[idHorario] !== 'libre') return;

    if (this.seleccionadas.includes(idStr)) {
      this.seleccionadas = this.seleccionadas.filter(id => id !== idStr);
    } else {
      this.seleccionadas.push(idStr);
    }
  }

    cogerFecha(event: any) {
    const fecha = event.detail.value;
    if (fecha) {
      this.fechaSeleccionada = fecha;
      this.listarHorarios(fecha);
    }
  }

  reservarPista(idHorario: number) {
    if (this.vecino.id) {
      this.pistaService.reservarPista(idHorario, this.vecino.id).subscribe({
        next: () => {
          console.log(`Horario ${idHorario} reservado`);
          this.listarHorarios(this.fechaSeleccionada);
        },
        error: () => {
          console.log(`Error al reservar horario ${idHorario}`);
        }
      });
    }
  }


  async confirmarReserva() {
    if (this.seleccionadas.length === 0) {
      const alerta = await this.alertController.create({
        header: 'Sin selección',
        message: 'Debes seleccionar al menos un horario para reservar.',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar reserva',
      message: `¿Estás seguro de que quieres reservar ${this.seleccionadas.length} horario(s)? No se puede cancelar.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Reserva cancelada');
          }
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.seleccionadas.forEach(idStr => {
              const id = parseInt(idStr, 10);
              this.reservarPista(id);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  volverAtras(): void {
    this.router.navigate(['/ver-pistas-vecino']);
  }

}

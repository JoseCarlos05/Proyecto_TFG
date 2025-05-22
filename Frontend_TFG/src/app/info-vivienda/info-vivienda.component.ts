import {Component, OnInit} from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {AlertController, IonicModule} from "@ionic/angular";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Usuario} from "../modelos/Usuario";
import {Comunidad} from "../modelos/Comunidad";
import {CrearGasto} from "../modelos/CrearGasto";
import {ComunidadService} from "../servicios/comunidad.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {GastosService} from "../servicios/gastos.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Vecino} from "../modelos/Vecino";
import {ViviendaService} from "../servicios/vivienda.service";
import {Vivienda} from "../modelos/Vivienda";
import {VecinoService} from "../servicios/vecino.service";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {environment} from "../../environments/environment";
import {Sancion} from "../modelos/Sancion";
import {Gasto} from "../modelos/Gasto";
import {SancionService} from "../servicios/sancion.service";

@Component({
  selector: 'app-info-vivienda',
  templateUrl: './info-vivienda.component.html',
  styleUrls: ['./info-vivienda.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    NgForOf,
    NgIf,
    MenuInferiorComunidadComponent,
    NgOptimizedImage
  ]
})
export class InfoViviendaComponent implements OnInit {
  baseUrl: string = environment.apiUrl;

  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  vivienda!: Vivienda

  propietario!: Vecino
  idVivienda!: number
  residentes: Vecino[] = []
  sanciones: Sancion[] = []
  deudas: Gasto[] = []

  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private gastoService: GastosService,
              private activateRoute: ActivatedRoute,
              private viviendaService: ViviendaService,
              private sancionService: SancionService,
              private alertController: AlertController) {
  }

  ngOnInit() {
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
    } else {
      this.router.navigate(['/']);
    }

    this.activateRoute.params.subscribe(params => {
      this.idVivienda = Number(params['id']);
    });
    this.verInfoVivienda(this.idVivienda)
  }

  cargarUsuario(correo: string): void {
    this.usuarioService.cargarUsuarioComunidad(correo).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        if (this.usuario && this.usuario.id) {
          this.cargarComunidad()
        }
      },
      error: (e) => {
        console.error("Error al cargar el usuario:", e);
      }
    });
  }

  cargarComunidad() {
    if (this.usuario.id) {
      this.comunidadService.cargarComunidadPorIdUsuario(this.usuario.id).subscribe({
        next: data => {
          this.comunidad = data
        }
      })
    }
  }

  listarResidentes() {
    this.residentes = []
    let resultado = []
    this.viviendaService.listarResidentesComunidad(this.vivienda.id).subscribe({
      next: data => {
        for (const vecino of data) {
          resultado.push(vecino)
        }
        this.residentes = resultado.filter((obj, index, self) =>
          index === self.findIndex(o => o.id === obj.id))
        this.cargarGastos()
        this.cargarSanciones()
      }
    })
  }

  cargarGastos() {
    this.deudas = []
    if (this.comunidad.id) {
      this.gastoService.listarGastosComunidad(this.comunidad.id).subscribe({
        next: data => {
          for (const gasto of data) {
            if (this.propietario && !gasto.pagados.includes(this.propietario.id)) {
              this.deudas.push(gasto)
            }
          }
        }
      })
    }
  }

  cargarSanciones() {
    if (this.propietario) {
      this.sancionService.listarSancionesVecino(this.comunidad.id, this.propietario.id).subscribe({
        next: data => this.sanciones = data
      })
    }
  }

  verInfoVivienda(idVivienda: number) {
    this.viviendaService.verInfoVivienda(idVivienda).subscribe({
      next: data => {
        this.vivienda = data;
        this.listarResidentes()
      }
    })
  }

  comprobarIdentidad(vecino: Vecino): string {
    if (this.comunidad.idPresidente) {
      if (vecino.id === this.comunidad.idPresidente) {
        this.propietario = vecino
        return "Presidente de la comunidad"

      } else if (vecino.id === this.vivienda.idPropietario) {
        this.propietario = vecino
        return "Propietario de la vivienda"

      } else {
        return "Residente"
      }
    }
    return ""
  }

  getImageUrlVecino(vecino: Vecino): string {
    if (!vecino.fotoPerfil || vecino.fotoPerfil.trim() === '') {
      return 'assets/icon/perfiles/26.png';
    } else if (vecino.fotoPerfil.startsWith('http')) {
      return vecino.fotoPerfil;
    } else {
      return `${this.baseUrl}${vecino.fotoPerfil}`;
    }
  }

  asignarPropietario(vecino: Vecino) {
    this.viviendaService.asignarPropietario(this.vivienda.id, vecino.id).subscribe({
      next: () => this.verInfoVivienda(this.idVivienda)
    })
  }

  async confirmarAsignacion(vecino: Vecino) {
    const alert = await this.alertController.create({
      header: 'Confirmar asignación',
      message: `¿Estás seguro de que quieres hacer a al vecino ${vecino.nombre} ${vecino.apellidos} propietario de la vivienda ${this.vivienda.direccionPersonal}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            alert.dismiss()
          }
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.asignarPropietario(vecino);
          }
        }
      ]
    });
    await alert.present();
  }

  generarCodigo() {
    this.comunidadService.generarCodigo(this.idVivienda, this.comunidad.id).subscribe({
      next: data => this.mostrarCodigo(data)
    })
  }

  async mostrarCodigo(codigo: string) {
    const alert = await this.alertController.create({
      header: `Comparte este código con un vecino:\n\n\n`,
      message: `${codigo}`,
      buttons: [
        {
          text: 'Cerrar',
          role: 'confirm',
          handler: () => {
            alert.dismiss()
          }
        }
      ]
    });
    await alert.present();
  }
}

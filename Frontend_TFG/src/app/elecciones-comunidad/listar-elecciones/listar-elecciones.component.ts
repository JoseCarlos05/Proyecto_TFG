import { Component, OnInit } from '@angular/core';
import {AlertController, IonicModule} from "@ionic/angular";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Eleccion} from "../../modelos/Eleccion";
import {Usuario} from "../../modelos/Usuario";
import {Comunidad} from "../../modelos/Comunidad";
import {CrearEleccion} from "../../modelos/CrearEleccion";
import {ComunidadService} from "../../servicios/comunidad.service";
import {Router} from "@angular/router";
import {UsuarioService} from "../../servicios/usuario.service";
import {EleccionesService} from "../../servicios/elecciones.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";

@Component({
  selector: 'app-listar-elecciones',
  templateUrl: './listar-elecciones.component.html',
  styleUrls: ['./listar-elecciones.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    NgIf,
    NgClass
  ]
})
export class ListarEleccionesComponent  implements OnInit {
  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  listaElecciones: Eleccion[] = []


  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private eleccionService: EleccionesService,
              private alertController: AlertController) { }

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
    }}

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
          this.listarElecciones()
        }
      })
    }
  }

  listarElecciones() {
    if (this.comunidad.id) {
      this.eleccionService.listarEleccionesComunidad(this.comunidad.id).subscribe({
        next: data => {
          this.listaElecciones = data.sort((a, b) => {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
          });
        }
      });
    }
  }

  calcularFecha(eleccion: Eleccion): string {
    if (!eleccion.fechaHoraCreacion) {
      return "";
    }

    const fechaActual = new Date();
    const fechaPublicacion = new Date(eleccion.fechaHoraCreacion);
    const milisegundos = fechaActual.getTime() - fechaPublicacion.getTime();

    const minutos = 1000 * 60;
    const horas   = minutos * 60;
    const dias    = horas * 24;
    const meses  = dias * 30;
    const anios   = dias * 365;

    if (milisegundos >= anios) {
      const years = Math.floor(milisegundos / anios);
      return `Hace ${years} ${years === 1 ? "año" : "años"}`;
    } else if (milisegundos >= meses) {
      const months = Math.floor(milisegundos / meses);
      return `Hace ${months} ${months === 1 ? "mes" : "meses"}`;
    } else if (milisegundos >= dias) {
      const days = Math.floor(milisegundos / dias);
      return `Hace ${days} ${days === 1 ? "día" : "días"}`;
    } else if (milisegundos >= horas) {
      const hours = Math.floor(milisegundos / horas);
      return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else if (milisegundos >= minutos) {
      const minutes = Math.floor(milisegundos / minutos);
      return `Hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    } else {
      return "Hace un momento";
    }
  }

  comprobarEstado(eleccion: Eleccion): string {
    if (!eleccion.abierta) {
      return "Cerrada";
    }else {
      return "Abierta"
    }

  }

  cerrarEleccion(idEleccion: number) {
    if (idEleccion) {
      this.eleccionService.cerrarEleccion(idEleccion).subscribe({
        next: () => {
          location.reload();
        },
        error: (e) => {
          console.error("Error al cerrar la elección:", e);
        }
      });
    }
  }

  async confirmarEleccion(idEleccion: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar cierre de elección',
      message: '¿Estás seguro de que quieres cerrar esta elección?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eleccion cancelado');
          }
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.cerrarEleccion(idEleccion);
          }
        }
      ]
    });

    await alert.present();
  }

}

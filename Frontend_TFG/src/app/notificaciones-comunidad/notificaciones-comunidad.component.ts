import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Vecino} from "../modelos/Vecino";
import {environment} from "../../environments/environment";
import {ComunidadService} from "../servicios/comunidad.service";
import {Solicitud} from "../modelos/Solicitud";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Usuario} from "../modelos/Usuario";
import {Router} from "@angular/router";
import {Comunidad} from "../modelos/Comunidad";
import {UsuarioService} from "../servicios/usuario.service";
import {ViviendaService} from "../servicios/vivienda.service";
import {Vivienda} from "../modelos/Vivienda";
import {TipoNotificacion} from "../modelos/Notificacion";

@Component({
    selector: 'app-notificaciones-comunidad',
    templateUrl: './notificaciones-comunidad.component.html',
    styleUrls: ['./notificaciones-comunidad.component.scss'],
    standalone: true,
  imports: [
    HeaderComponent,
    MenuInferiorComunidadComponent,
    IonicModule,
    NgOptimizedImage,
    NgForOf,
    NgIf,
    NgClass
  ]
})
export class NotificacionesComunidadComponent  implements OnInit {
  baseUrl: string = environment.apiUrl;

  correo: string = ""
  usuario: Usuario = {} as Usuario
  comunidad: Comunidad = {} as Comunidad
  solicitudes: Solicitud[] = []
  vecinos: Vecino[]  = []
  vecinosIds: number[] = []
  viviendas: Vivienda[] = []
  viviendasIds: number[] = []

  constructor(private comunidadService: ComunidadService,
              private usuarioService: UsuarioService,
              private viviendaService: ViviendaService,
              private router: Router) { }

  ngOnInit() {}

  ionViewWillEnter() {
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
          this.listarSolicitudes()
        }
      })
    }
  }

  listarSolicitudes() {
    this.solicitudes = []
    this.comunidadService.listarSolicitudes(this.comunidad.id).subscribe({
      next: data => {
        this.solicitudes = data
        for (let solicitud of data) {
          this.vecinosIds.push(solicitud.idVecino)
          this.viviendasIds.push(solicitud.idVivienda)
        }
        this.cargarVecinosSolicitudes()
        this.cargarViviendasSolicitudes()
      }
    })
  }

  cargarVecinosSolicitudes() {
    for (let id of this.vecinosIds) {
      this.comunidadService.cargarVecinoPorIdVecinoComunidad(id).subscribe({
        next: data => {
          this.vecinos.push(data)
        }
      })
    }
  }

  cargarViviendasSolicitudes() {
    for (let id of this.viviendasIds) {
      this.viviendaService.verInfoVivienda(id).subscribe({
        next: data => {
          this.viviendas.push(data)
        }
      })
    }
  }

  cargarNombreVecino(idVecino: number): string {
    const vecino = this.vecinos.find(v => v.id === idVecino)
    if (vecino) {
      return vecino.nombre + ' ' + vecino.apellidos
    }
    return ''
  }

  cargarNombreVivienda(idVivienda: number): string {
    const vivienda = this.viviendas.find(v => v.id === idVivienda)
    if (vivienda) {
      return vivienda.direccionPersonal
    }
    return ''
  }

  cargarFotoVecino(idVecino: number): string {
    const vecino = this.vecinos.find(v => v.id === idVecino)
    if (vecino) {
      return this.getImageUrlVecino(vecino)
    }
    return ''
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

  aceptarSolicitud(solicitud: Solicitud) {
    const ids: number[] = [solicitud.idVecino]
    this.comunidadService.aceptarSolicitud(solicitud).subscribe({
      next: () => {
        this.comunidadService.enviarNotificacion(ids, this.comunidad.id, TipoNotificacion.BIENVENIDA).subscribe({
          next: () => this.listarSolicitudes()
        })
      }
    })
  }

  rechazarSolicitud(solicitud: Solicitud) {
    this.comunidadService.rechazarSolicitud(solicitud).subscribe({
      next: () => this.listarSolicitudes()
    })
  }
}

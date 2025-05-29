import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {Usuario} from "../modelos/Usuario";
import {Comunidad} from "../modelos/Comunidad";
import {ComunidadService} from "../servicios/comunidad.service";
import {Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {VecinoService} from "../servicios/vecino.service";
import {Vecino} from "../modelos/Vecino";
import {Notificacion, TipoNotificacion} from "../modelos/Notificacion";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    FooterComunidadComponent,
    HeaderComunidadComponent,
    NgForOf,
    NgOptimizedImage,
    NgIf
  ]
})
export class NotificacionesComponent  implements OnInit {
  baseUrl: string = environment.apiUrl;

  correo?: string;
  private usuario!: Usuario
  vecino!: Vecino;
  private comunidad!: Comunidad
  notificaciones: Notificacion[] = []

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService) { }

  ngOnInit(): void {}

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
    this.usuarioService.cargarUsuario(correo).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        if (this.usuario && this.usuario.id) {
          this.cargarVecino();
        }
      },
      error: (e) => {
        console.error("Error al cargar el usuario:", e);
      }
    });
  }

  cargarVecino(): void {
    if (this.usuario.id) {
      this.vecinoService.cargarVecinoPorIdUsuario(this.usuario.id).subscribe({
        next: data => {
          this.vecino = data;
          this.cargarComunidad()
        }
      });
    }
  }

  cargarComunidad() {
    const comunidadStorage = sessionStorage.getItem('comunidad');
    if (comunidadStorage) {
      this.comunidad = JSON.parse(comunidadStorage);
      this.cargarNotificaciones()
    }
  }

  cargarNotificaciones() {
    this.notificaciones = []
    this.vecinoService.verNotificaciones(this.vecino.id, this.comunidad.id).subscribe({
      next: data => {
        this.notificaciones = data
      }
    })
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

  calcularFecha(fechaISO: string): string {
    const fechaActual = new Date();
    const fechaPublicacion = new Date(fechaISO);
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

  mensaje(tipo: TipoNotificacion): string {
    if (tipo === TipoNotificacion.BIENVENIDA) {
      return `¡HOLA ${this.vecino.nombre.toUpperCase()}! BIENVENIDO A NUESTRA COMUNIDAD ${this.comunidad.nombre.toUpperCase()}`
    } else if (tipo === TipoNotificacion.DEUDA) {
      return `${this.vecino.nombre} ${this.vecino.apellidos}, se le recuerda que tiene gastos pendientes en esta comunidad. Haga click para verlo`
    } else if (tipo === TipoNotificacion.COMUNICADO) {
      return `La comunidad ha publicado un nuevo comunicado. Haga click para verlo`
    } else if (tipo === TipoNotificacion.SANCION) {
      return `${this.vecino.nombre} ${this.vecino.apellidos}, se le informa que acaba de ser sancionado. Haga click para ver detalles`
    } else if (tipo === TipoNotificacion.RESERVA) {
      return `Le recordamos que tiene una reserva de una propiedad de la comunidad progamada para mañana`
    } else if (tipo === TipoNotificacion.ELECCION) {
      return `Se acaba de crear una nueva elección en la comunidad. Pulsa para ir a votar`
    }
    return ''
  }

  eliminarYRedireccion(notificacion: Notificacion) {
    if (notificacion.tipo === TipoNotificacion.COMUNICADO || notificacion.tipo === TipoNotificacion.SANCION) {
      this.router.navigate(['/comunidad/documentacion'])
    } else if (notificacion.tipo === TipoNotificacion.DEUDA) {
      this.router.navigate(['/comunidad/gastos'])
    } else if (notificacion.tipo === TipoNotificacion.ELECCION) {
      this.router.navigate(['/comunidad/elecciones'])
    }

    this.vecinoService.eliminarNotificacion(this.vecino.id, notificacion.id!).subscribe({
      next: () => this.cargarNotificaciones()
    })
  }
}

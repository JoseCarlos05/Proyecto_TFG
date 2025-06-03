import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavigationEnd, Router} from "@angular/router";
import {Comunidad} from "../modelos/Comunidad";
import {NgIf} from "@angular/common";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Usuario} from "../modelos/Usuario";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {Vecino} from "../modelos/Vecino";
import {filter, Subscription} from "rxjs";

@Component({
    selector: 'app-header-comunidad',
    templateUrl: './header-comunidad.component.html',
    styleUrls: ['./header-comunidad.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    NgIf
  ]
})
export class HeaderComunidadComponent  implements OnInit {

  notificacionesPendientes = 0
  correo: string = ""
  usuario: Usuario = {} as Usuario
  comunidadObjeto!: Comunidad
  vecino!: Vecino;
  private routerSubscription!: Subscription;

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService) {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {})
  }

  ngOnInit() {
    this.inicio()
  }

  inicio() {
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
          if (!this.router.url.includes('/notificaciones')) {
            this.cargarNotificaciones()
          }
        }
      });
    }
  }

  cargarNotificaciones() {
    this.vecinoService.verNotificaciones(this.vecino.id, this.comunidadObjeto.id).subscribe({
      next: data => this.notificacionesPendientes = data.length
    })
  }

  navigateToComunidades() {
    sessionStorage.removeItem('comunidad');
    this.router.navigate(['/comunidades']);
  }

  navigateToChat() {
    this.router.navigate(['/lista-vecinos']);
  }

  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }
}

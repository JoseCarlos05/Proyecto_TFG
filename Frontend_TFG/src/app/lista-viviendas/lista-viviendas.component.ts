import { Component, OnInit } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {ComunidadService} from "../servicios/comunidad.service";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {Comunidad} from "../modelos/Comunidad";
import {Vivienda} from "../modelos/Vivienda";
import {ViviendaService} from "../servicios/vivienda.service";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";

@Component({
    selector: 'app-lista-viviendas',
    templateUrl: './lista-viviendas.component.html',
    styleUrls: ['./lista-viviendas.component.scss'],
    standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    NgForOf,
    MenuInferiorComunidadComponent,
    NgIf
  ]
})
export class ListaViviendasComponent  implements OnInit {

  notificacionesPendientes = 3
  private usuario!: Usuario
  private comunidad!: Comunidad
  listaViviendas: Vivienda[] = []
  correo!: string
  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private viviendaService: ViviendaService,
              private comunidadService: ComunidadService) { }

  ngOnInit() {
    this.inicio()
  }

  ionViewWillEnter() {
    this.inicio()
  }

  inicio() {
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
          this.listarViviendas()
        }
      })
    }
  }

  listarViviendas() {
    if (this.comunidad.id)
      this.viviendaService.listarViviendasComunidad(this.comunidad.id).subscribe({
        next: data => {
          this.listaViviendas = data
          this.listarSolicitudes()
        }
      })
  }

  listarSolicitudes() {
    this.comunidadService.listarSolicitudes(this.comunidad.id).subscribe({
      next: data => this.notificacionesPendientes = data.length
    })
  }

  verInfoVvivienda(idVivienda: number) {
    this.router.navigate(["/info-vivienda", idVivienda])
  }

  crearVivienda() {
    this.router.navigate(["/crear/vivienda"])
  }

  verNotificaciones() {
    this.router.navigate(["/notificaciones-comunidad"])
  }
}

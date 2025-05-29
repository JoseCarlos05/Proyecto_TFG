import { Component, OnInit } from '@angular/core';
import {ViviendaService} from "../servicios/vivienda.service";
import {Router} from "@angular/router";
import {InsertarCodigo} from "../modelos/InsertarCodigo";
import {CrearVivienda} from "../modelos/CrearVivienda";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Usuario} from "../modelos/Usuario";
import {Comunidad} from "../modelos/Comunidad";
import {Vivienda} from "../modelos/Vivienda";
import {UsuarioService} from "../servicios/usuario.service";
import {ComunidadService} from "../servicios/comunidad.service";

@Component({
  selector: 'app-crear-vivienda',
  templateUrl: './crear-vivienda.component.html',
  styleUrls: ['./crear-vivienda.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    MenuInferiorComunidadComponent,
    HeaderComponent
  ]
})
export class CrearViviendaComponent  implements OnInit {
  private usuario!: Usuario
  private comunidad!: Comunidad
  correo!: string


  crearVvienda: CrearVivienda = {
    direccionPersonal: "",
    idComunidad: undefined
  }

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private viviendaService: ViviendaService,
              private comunidadService: ComunidadService) { }

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
          this.crearVvienda.idComunidad = this.comunidad.id
        }
      })
    }
  }

  volverAtras(): void {
    this.router.navigate(['/lista-viviendas']);
  }

  crearViviendaMetodo() {
    if (!this.crearVvienda.direccionPersonal || !this.crearVvienda.idComunidad) {
      const toast = document.getElementById("campoVacioVivienda") as any;
      toast.present();
      return;
    }
    this.viviendaService.crearVivienda(this.crearVvienda).subscribe({
      next: () => {
        const toast = document.getElementById("exitoCreacionVivienda") as any;
        toast.present();
        this.router.navigate(['/lista-viviendas']);
      },
      error: () => {
        console.log('Error al insertar codigo.');
      }
    });
  }
}



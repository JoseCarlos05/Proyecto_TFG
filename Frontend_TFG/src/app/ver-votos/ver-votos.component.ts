import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {AlertController, IonicModule} from "@ionic/angular";
import {Usuario} from "../modelos/Usuario";
import {Comunidad} from "../modelos/Comunidad";
import {Eleccion} from "../modelos/Eleccion";
import {ComunidadService} from "../servicios/comunidad.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {EleccionesService} from "../servicios/elecciones.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {EleccionVotos} from "../modelos/EleccionVotos";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";

@Component({
    selector: 'app-ver-votos',
    templateUrl: './ver-votos.component.html',
    styleUrls: ['./ver-votos.component.scss'],
    standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    MenuInferiorComunidadComponent
  ]
})
export class VerVotosComponent  implements OnInit {

  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  idEleccion!: number;
  eleccion: EleccionVotos = {} as EleccionVotos;
  totalVoto?: number;


  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private eleccionesService: EleccionesService,
              private activateRoute: ActivatedRoute) { }

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
        }
      })
    }
  }
  getEleccion() {
    if (this.idEleccion) {
      this.eleccionesService.getEleccionComunidad(this.idEleccion).subscribe({
        next: data => {
          this.eleccion = data;
          this.totalVotoMetodo()
        }
      });
    }
  }
  totalVotoMetodo() {
    if (this.idEleccion) {
      this.eleccionesService.totalVotoComunidad(this.idEleccion).subscribe({
        next: data => {
          this.totalVoto = data;
        }
      });
    }
  }

}

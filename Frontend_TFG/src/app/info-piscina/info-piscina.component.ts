import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {Comunidad} from "../modelos/Comunidad";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {ActivatedRoute, Router} from "@angular/router";
import {GastosService} from "../servicios/gastos.service";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {PropiedadService} from "../servicios/propiedad.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-info-piscina',
  templateUrl: './info-piscina.component.html',
  styleUrls: ['./info-piscina.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    HeaderComponent,
    FooterComunidadComponent
  ]
})
export class InfoPiscinaComponent  implements OnInit {
  baseUrl: string = environment.apiUrl;

  mostrarFrente = true;


  comunidadObjeto!: Comunidad
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string
  constructor(private router: Router,
              private gastosService: GastosService,
              private activateRoute: ActivatedRoute,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private propiedadService: PropiedadService) {
  }

  ngOnInit() {
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

  getImageUrlVecino(vecino: Vecino): string {
    if (!vecino.fotoPerfil || vecino.fotoPerfil.trim() === '') {
      return 'assets/icon/perfiles/26.png';
    } else if (vecino.fotoPerfil.startsWith('http')) {
      return vecino.fotoPerfil;
    } else {
      return `${this.baseUrl}${vecino.fotoPerfil}`;
    }
  }

  toggleTarjeta() {
    this.mostrarFrente = !this.mostrarFrente;
  }

}

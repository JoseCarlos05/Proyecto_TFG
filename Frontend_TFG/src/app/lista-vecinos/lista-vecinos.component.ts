import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {EditarVecinoDTO} from "../modelos/EditarVecinoDTO";
import {Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {ComunidadService} from "../servicios/comunidad.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Mensaje} from "../modelos/Mensaje";
import {Comunidad} from "../modelos/Comunidad";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {environment} from "../../environments/environment";
import {VecinoUsuarioDTO} from "../modelos/VecinoUsuarioDTO";
import {MensajeService} from "../servicios/mensaje.service";

@Component({
  selector: 'app-lista-vecinos',
  templateUrl: './lista-vecinos.component.html',
  styleUrls: ['./lista-vecinos.component.scss'],
  standalone: true,
  imports: [
    FooterComunidadComponent,
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    NgForOf,
    NgOptimizedImage,
    NgIf
  ]
})
export class ListaVecinosComponent  implements OnInit {
  baseUrl: string = environment.apiUrl;

  comunidadObjeto!: Comunidad
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string
  listaVecinos: VecinoUsuarioDTO[] = []
  ultimosMensajes: { [key: number]: string } = {}

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private mensajeService: MensajeService) { }

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
          this.listarVecinos()
        }
      })
    }
  }

  listarVecinos() {
    if (this.comunidadObjeto?.id) {
      this.vecinoService.listarVecinosComunidad(this.comunidadObjeto.id).subscribe({
        next: data => {
          this.listaVecinos = data.filter(v => v.id !== this.vecino.id);
          this.cargarUltimosMensajes()
        },
        error: err => {
          console.error("Error al listar vecinos:", err);
        }
      });
    }
  }

  cargarUltimosMensajes() {
    for (const vecino of this.listaVecinos) {
      this.mensajeService.verConversacion(this.usuario.id, vecino.idUsuario).subscribe({
        next: data => {
          if (data.length !== 0) {
            data.sort((a, b) => new Date(a.fecha!).getTime() - new Date(b.fecha!).getTime())
            let ultimoMensaje = data[data.length - 1]
            if (ultimoMensaje.idEmisor === this.usuario.id) {
              this.ultimosMensajes[vecino.idUsuario] = "Tú: " + data[data.length - 1].texto
            } else {
              this.ultimosMensajes[vecino.idUsuario] = data[data.length - 1].texto
            }
          }
        }
      })
    }
    console.log(this.ultimosMensajes)
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

  navigateToChat(idUsuario: number) {
    this.router.navigate(['chat', idUsuario])
  }
}

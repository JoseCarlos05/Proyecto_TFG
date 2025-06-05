import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Usuario} from "../../modelos/Usuario";
import {Vecino} from "../../modelos/Vecino";
import {Sancion} from "../../modelos/Sancion";
import {Comunidad} from "../../modelos/Comunidad";
import {SancionService} from "../../servicios/sancion.service";
import {UsuarioService} from "../../servicios/usuario.service";
import {VecinoService} from "../../servicios/vecino.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {Carta} from "../../modelos/Carta";
import {ElementoCartaService} from "../../servicios/elemento-carta.service";
import {ElementoCarta} from "../../modelos/ElementoCarta";

@Component({
  selector: 'app-carta-vecino',
  templateUrl: './carta-vecino.component.html',
  styleUrls: ['./carta-vecino.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    ReactiveFormsModule
  ]
})
export class CartaVecinoComponent  implements OnInit {
  private usuario!: Usuario
  private vecino!: Vecino
  correo?: string
  comunidadObjeto?: Comunidad
  cartaAbierta = false;
  private carta!: Carta
  listaElementos: ElementoCarta[] = []

  constructor(private sancionService: SancionService,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private elemetoCartaService: ElementoCartaService) { }

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
          this.vecino = data
          this.listarElememtoMetodo()
          this.verCarta()

        }
      })
    }
  }

  listarElememtoMetodo() {
    if (this.comunidadObjeto?.id) {
      this.elemetoCartaService.listarElementosVecino(this.comunidadObjeto.id).subscribe({
        next: data => {
          this.listaElementos = data
        }
      });
    }
  }

  verCarta() {
    if (this.comunidadObjeto?.id) {
      this.elemetoCartaService.verCartaComunidadVecino(this.comunidadObjeto.id).subscribe({
        next: data => {
          this.carta = data;
        }
      });
    }
  }


  abrirCartaCompleta() {
    this.cartaAbierta = true;
  }

  cerrarCartaCompleta() {
    this.cartaAbierta = false;
  }
}

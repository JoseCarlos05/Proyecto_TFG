import { Component, OnInit } from '@angular/core';
import {IonicModule, ToastController} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {a, b} from "@angular/core/navigation_types.d-u4EOrrdZ";
import {Usuario} from "../../modelos/Usuario";
import {Comunidad} from "../../modelos/Comunidad";
import {TipoPropiedad} from "../../enum/TipoPropiedad";
import {CrearPropiedad} from "../../modelos/CrearPropiedad";
import {Router} from "@angular/router";
import {UsuarioService} from "../../servicios/usuario.service";
import {PropiedadService} from "../../servicios/propiedad.service";
import {ComunidadService} from "../../servicios/comunidad.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {ElementoCartaService} from "../../servicios/elemento-carta.service";
import {Eleccion} from "../../modelos/Eleccion";
import {TipoNotificacion} from "../../modelos/Notificacion";
import {CrearEleccion} from "../../modelos/CrearEleccion";
import {AnadirElemento} from "../../modelos/AnadirElemento";
import {ElementoCarta} from "../../modelos/ElementoCarta";
import {Carta} from "../../modelos/Carta";

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    FormsModule
  ]
})
export class CartaComponent implements OnInit{
  private usuario!: Usuario
  private comunidad!: Comunidad
  correo!: string
  listaElementos: ElementoCarta[] = []
  cartaAbierta = false;
  private carta!: Carta

  anadirElemento: AnadirElemento = {
    nombre: "",
    descripcion: "",
    precio: "",
    idCarta: undefined,
    idComunidad: undefined
  }
  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private propiedadService: PropiedadService,
              private comunidadService: ComunidadService,
              private elemetoCartaService: ElementoCartaService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.inicio()
  }

  ionViewWillEnter() {
    this.inicio()
  }

  inicio() {
    this.cartaAbierta = false;

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
          this.anadirElemento.idComunidad = this.comunidad.id
          this.listarElememtoMetodo()

          this.verCarta()
        }
      })
    }
  }

  listarElememtoMetodo() {
    if (this.comunidad.id) {
      this.elemetoCartaService.listarElementos(this.comunidad.id).subscribe({
        next: data => {
          this.listaElementos = data
        }
      });
    }
  }

  verCarta() {
    if (this.comunidad.id) {
      this.elemetoCartaService.verCartaComunidad(this.comunidad.id).subscribe({
        next: data => {
          this.carta = data;
          this.anadirElemento.idCarta = this.carta.id;
        }
      });
    }
  }

  async anadirElementoMetodo() {
    this.elemetoCartaService.crearElemento(this.anadirElemento).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Elemento añadido con éxito.',
          duration: 2000,
          color: 'success',
          position: 'bottom'
        });
        await toast.present();

        this.anadirElemento = {
          nombre: "",
          descripcion: "",
          precio: "",
          idComunidad: this.comunidad?.id
        };

        this.listarElememtoMetodo();
      },
      error: () => {
        console.log('Error al crear el elemento.');
      }
    });
  }

  abrirCartaCompleta() {
    this.cartaAbierta = true;
  }

  cerrarCartaCompleta() {
    this.cartaAbierta = false;
  }
}

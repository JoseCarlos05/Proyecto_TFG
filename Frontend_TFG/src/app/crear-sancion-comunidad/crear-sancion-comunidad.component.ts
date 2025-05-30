import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {QuillModule} from "ngx-quill";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import Quill from "quill";
import {ColorAttributor} from "quill/formats/color";
import {FontType} from "../enum/TipoFuente";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Usuario} from "../modelos/Usuario";
import {Comunidad} from "../modelos/Comunidad";
import {CrearSancionComunidad} from "../modelos/CrearSancionComunidad";
import {Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {ComunidadService} from "../servicios/comunidad.service";
import {SancionService} from "../servicios/sancion.service";
import {Vecino} from "../modelos/Vecino";
import {CommonModule} from "@angular/common";
import {ViviendaService} from "../servicios/vivienda.service";
import {Vivienda} from "../modelos/Vivienda";

@Component({
  selector: 'app-crear-sancion-comunidad',
  templateUrl: './crear-sancion-comunidad.component.html',
  styleUrls: ['./crear-sancion-comunidad.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    HeaderComponent,
    HeaderComunidadComponent,
    FooterComunidadComponent,
    QuillModule,
    MenuInferiorComunidadComponent,
    CommonModule,
  ]
})
export class CrearSancionComunidadComponent implements OnInit {

  correo?: string;
  private usuario!: Usuario;
  private comunidad!: Comunidad;
  vecinos: Vecino[] = [];

  crearSancion: CrearSancionComunidad = {
    motivo: "",
    sancion: "",
    idComunidad: undefined
  };

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private comunidadService: ComunidadService,
              private sancionService: SancionService,
              private viviendaService: ViviendaService) {}

  ngOnInit() {
    this.inicio();
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
    }
  }

  cargarUsuario(correo: string): void {
    this.usuarioService.cargarUsuarioComunidad(correo).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        if (this.usuario && this.usuario.id) {
          this.cargarComunidad();
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
          this.comunidad = data;
          this.crearSancion.idComunidad = this.comunidad.id;
          this.cargarVecinos();
        }
      });
    }
  }

  cargarVecinos() {
    if (this.comunidad && this.comunidad.id) {
      this.comunidadService.listarVecinosPorComunidad(this.comunidad.id).subscribe({
        next: (vecinos: Vecino[]) => {
          this.viviendaService.listarViviendasComunidad(this.comunidad.id).subscribe({
            next: (viviendas: Vivienda[]) => {
              const propietariosIds = viviendas.map(v => v.idPropietario);
              this.vecinos = vecinos.filter(v => propietariosIds.includes(v.id));
            },
            error: e => console.error("Error al cargar viviendas:", e)
          });
        },
        error: e => console.error("Error al cargar vecinos:", e)
      });
    }
  }

  crearSancionMetodo() {
    if (!this.crearSancion.motivo || !this.crearSancion.sancion || !this.crearSancion.idComunidad || !this.crearSancion.idVecino) {
      console.log("Faltan datos para crear la sanción.");
      return;
    }

    this.sancionService.crearSancionComunidad(this.crearSancion).subscribe({
      next: () => {
        this.crearSancion.motivo = "";
        this.crearSancion.sancion = "";
        this.router.navigate(['/documentacion/comunidad']);
      },
      error: () => {
        console.log('Error al insertar sanción.');
      }
    });
  }
}

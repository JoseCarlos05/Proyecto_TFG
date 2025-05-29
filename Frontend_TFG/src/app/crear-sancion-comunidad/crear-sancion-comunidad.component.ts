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

  @ViewChild('quillEditor', {static: false}) quillEditor: any;

  fontType: FontType[] = ['Verdana', 'Arial', 'Courier New', 'Georgia', 'Tahoma', 'Times New Roman'];

  formatos = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'color',
    'link',
    'image'
  ];

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
              private sancionService: SancionService) {}

  ngOnInit() {
    this.inicio();
    this.quillSetUp();
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

  quillSetUp() {
    const font: any = Quill.import('formats/font');
    const FontStyle: any = Quill.import('attributors/style/font');
    const SizeStyle: any = Quill.import('attributors/style/size');
    font.whitelist = [...this.fontType.map(type => type.toLowerCase().replace(/\s+/g, ''))];
    Quill.register(font, true);
    Quill.register(FontStyle, true);
    Quill.register(SizeStyle, true);
  }

  quillConfig = {
    toolbar: [
      [{font: [...this.fontType.map(type => type.toLowerCase().replace(/\s+/g, ''))]}, {size: ['8px', '12px', '16px', '24px']}],
      ['bold', 'italic', 'underline'],
      [{color: ['rgb(0, 163, 255)', 'rgb(42, 227, 236)', 'rgb(250, 196, 8)']}],
      ['link'],
      ['image']
    ]
  };

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
        next: (data: Vecino[]) => {
          this.vecinos = data;
        },
        error: (e) => {
          console.error("Error al cargar los vecinos:", e);
        }
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

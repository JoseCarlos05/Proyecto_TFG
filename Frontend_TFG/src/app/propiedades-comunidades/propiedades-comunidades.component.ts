import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {Usuario} from "../modelos/Usuario";
import {Comunidad} from "../modelos/Comunidad";
import {Vivienda} from "../modelos/Vivienda";
import {Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {ViviendaService} from "../servicios/vivienda.service";
import {ComunidadService} from "../servicios/comunidad.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {TipoPropiedad} from "../enum/TipoPropiedad";
import {PropiedadService} from "../servicios/propiedad.service";
import {TipoVoto} from "../enum/TipoVoto";
import {CrearPropiedad} from "../modelos/CrearPropiedad";

@Component({
    selector: 'app-propiedades-comunidades',
    templateUrl: './propiedades-comunidades.component.html',
    styleUrls: ['./propiedades-comunidades.component.scss'],
    standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    MenuInferiorComunidadComponent
  ]
})
export class PropiedadesComunidadesComponent  implements OnInit {
  private usuario!: Usuario
  private comunidad!: Comunidad
  listaTipoPropiedad: TipoPropiedad[] = []
  correo!: string

  crearPropiedade: CrearPropiedad = {
    nombre: "",
    tipo: undefined,
    idComunidad: undefined
  }
  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private propiedadService: PropiedadService,
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
          this.crearPropiedade.idComunidad = this.comunidad.id
          this.listarTipoPropiedades()
        }
      })
    }
  }

  listarTipoPropiedades() {
    if (this.comunidad.id)
      this.propiedadService.listarTipoPropiedades(this.comunidad.id).subscribe({
        next: data => {
          this.listaTipoPropiedad = data
          console.log(this.listaTipoPropiedad)
        }
      })
  }


  estaEnComunidad(tipo: string): boolean {
    const tipoPropiedad: TipoPropiedad = TipoPropiedad[tipo as keyof typeof TipoPropiedad];
    return this.listaTipoPropiedad.includes(tipoPropiedad);
  }

  crearPropiedad() {
    this.propiedadService.crearPropiedad(this.crearPropiedade).subscribe({
      next: () => {
        console.log("Exito en la creacion")
        this.listarTipoPropiedades()
      },
      error: () => {
        console.log('Error ');
      }
    });
  }

  eliminarPropiedad(tipoPropiedad: TipoPropiedad) {
    this.propiedadService.eliminarPropiedad(this.comunidad.id, tipoPropiedad).subscribe({
      next: () => {
        console.log("Exito en la creacion")
        this.listarTipoPropiedades()
      },
      error: () => {
        console.log('Error ');
      }
    });
  }

  accionPropiedad(tipo: string, nombre: string) {
    const tipoPropiedad: TipoPropiedad = TipoPropiedad[tipo as keyof typeof TipoPropiedad];

    if (!this.estaEnComunidad(tipo)) {
      this.crearPropiedade.tipo = tipoPropiedad;
      this.crearPropiedade.nombre = nombre;
      console.log("Creado propiedad con tipo:", tipoPropiedad);
      this.crearPropiedad();
    } else {
      console.log("Eliminsdo:", tipoPropiedad);
      this.eliminarPropiedad(tipoPropiedad);
    }
  }



}

import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {FooterComponent} from "../footer/footer.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {Comunicado} from "../modelos/Comunicado";
import {Comunidad} from "../modelos/Comunidad";
import {CrearComunicado} from "../modelos/CrearComunicado";
import {Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {ComunidadService} from "../servicios/comunidad.service";
import {ComunicadoService} from "../servicios/comunicado.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";

@Component({
    selector: 'app-crear-comunicado',
    templateUrl: './crear-comunicado.component.html',
    styleUrls: ['./crear-comunicado.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    HeaderComponent,
    HeaderComunidadComponent,
    FooterComponent,
    FooterComunidadComponent
  ]
})
export class CrearComunicadoComponent  implements OnInit {

  private usuario!: Usuario
  private vecino!: Vecino
  correo?: string
  comunidadObjeto?: Comunidad

  crearComunicado: CrearComunicado = {
    descripcion: "",
    idComunidad: undefined,
    idVecino: undefined
  };



  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private comunidadService: ComunidadService,
              private comunicadoService: ComunicadoService) { }

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
          this.crearComunicado.idVecino = this.vecino?.id;
          this.crearComunicado.idComunidad = this.comunidadObjeto?.id;
        }
      });
    }
  }


  crearComunicadoMetodo() {
    if (!this.crearComunicado.descripcion || !this.crearComunicado.idComunidad || !this.crearComunicado.idVecino) {
      console.log("Faltan datos para crear el comunicado.");
      return;
    }

    this.comunicadoService.crearComunicado(this.crearComunicado).subscribe({
      next: () => {
        this.crearComunicado.descripcion = "";
        this.router.navigate(['/comunidad/documentacion']);
      },
      error: () => {
        console.log('Error al insertar comunicado.');
      }
    });
  }


}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgIf, NgOptimizedImage} from "@angular/common";
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
import * as QRCode from 'qrcode';
import {ViviendaService} from "../servicios/vivienda.service";
import {Vivienda} from "../modelos/Vivienda";

@Component({
  selector: 'app-info-piscina',
  templateUrl: './info-piscina.component.html',
  styleUrls: ['./info-piscina.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    FooterComunidadComponent,
    NgOptimizedImage
  ]
})
export class InfoPiscinaComponent  implements OnInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef;

  baseUrl: string = environment.apiUrl;

  mostrarFrente = true;

  comunidadObjeto!: Comunidad
  usuario: Usuario = {} as Usuario
  vecino: Vecino = {} as Vecino
  correo?: string
  vivienda: Vivienda = {} as Vivienda
  constructor(private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private viviendaService: ViviendaService) {
  }

  ngOnInit() {
    this.inicio()
  }

  ionViewWillEnter() {
    this.inicio()
  }

  inicio() {
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

  generarQR() {
    const datos = `Este usuario pertenece a la vivienda ${this.vivienda.direccionPersonal} de la comunidad ${this.comunidadObjeto.nombre}.
    Sus datos son: ${this.vecino.nombre} ${this.vecino.apellidos}, ${this.vecino.dni}, ${this.vecino.fechaNacimiento}, ${this.vecino.telefono}.`

    QRCode.toCanvas(this.canvasRef.nativeElement, datos, {
      width: 150
    }, function (error) {
      if (error) console.error(error);
    });
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
          this.cargarVivienda()
        }
      })
    }
  }

  cargarVivienda() {
    if (this.comunidadObjeto.id && this.vecino.id) {
      this.viviendaService.listarViviendas(this.comunidadObjeto.id).subscribe({
        next: data => {
          for (let vivienda of data) {
            if (vivienda.idVecinos.includes(this.vecino.id)) {
              this.vivienda = vivienda
              break
            }
          }
          this.generarQR()
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

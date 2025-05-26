import { Component, OnInit } from '@angular/core';
import {AlertController, IonicModule} from '@ionic/angular';
import { NgForOf } from '@angular/common';
import {HeaderComponent} from "../header/header.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {Usuario} from "../modelos/Usuario";
import {Comunidad} from "../modelos/Comunidad";
import {Vivienda} from "../modelos/Vivienda";
import {Vecino} from "../modelos/Vecino";
import {Sancion} from "../modelos/Sancion";
import {Gasto} from "../modelos/Gasto";
import {EditarVivienda} from "../modelos/EditarVivienda";
import {ComunidadService} from "../servicios/comunidad.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {GastosService} from "../servicios/gastos.service";
import {ViviendaService} from "../servicios/vivienda.service";
import {SancionService} from "../servicios/sancion.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Garaje} from "../modelos/Garaje";
import {GarajeService} from "../servicios/garaje.service";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";

@Component({
  selector: 'app-info-garaje',
  templateUrl: './info-garaje.component.html',
  styleUrls: ['./info-garaje.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    HeaderComponent,
    FooterComunidadComponent,
    MenuInferiorComunidadComponent
  ]
})
export class InfoGarajeComponent implements OnInit {

  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  private viviendas?: Vivienda[] = []
  listaGarajes: Garaje[] = []

  bloquesGaraje: { fila1: Garaje[]; fila2: Garaje[] }[] = [];

  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private garajeService: GarajeService,
              private viviendaService: ViviendaService) {
  }

  ngOnInit() {
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
          this.listarGarajesMetodo()
          this.cargarViviendas()
        }
      })
    }
  }

  organizarGarajesEnBloques() {
    this.bloquesGaraje = [];

    for (let i = 0; i < this.listaGarajes.length; i += 6) {
      const bloque = {
        fila1: this.listaGarajes.slice(i, i + 3),
        fila2: this.listaGarajes.slice(i + 3, i + 6)
      };
      this.bloquesGaraje.push(bloque);
    }
  }


  listarGarajesMetodo() {
    if (this.comunidad.id) {
      this.garajeService.listarGarajes(this.comunidad.id).subscribe({
        next: data => {
          this.listaGarajes = data;
          this.organizarGarajesEnBloques();
        }
      });
    }
  }

  cargarViviendas() {
    this.viviendaService.listarViviendasComunidad(this.comunidad.id).subscribe({
      next: data => {
        this.viviendas = data
      }
    })
  }

  obtenerNombreVivienda(idVivienda: number | null | undefined): string {
    if (!idVivienda || !this.viviendas) return 'Sin asignar';
    const vivienda = this.viviendas.find(v => Number(v.id) === Number(idVivienda));
    return vivienda ? vivienda.direccionPersonal : 'Sin asignar';
  }

}

import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {Usuario} from "../../modelos/Usuario";
import {UsuarioService} from "../../servicios/usuario.service";
import {ComunidadService} from "../../servicios/comunidad.service";
import {VecinoService} from "../../servicios/vecino.service";
import {Vecino} from "../../modelos/Vecino";
import {SancionService} from "../../servicios/sancion.service";
import {Sancion} from "../../modelos/Sancion";
import {Comunidad} from "../../modelos/Comunidad";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-sanciones',
  templateUrl: './sanciones.component.html',
  styleUrls: ['./sanciones.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    NgIf
  ]
})
export class SancionesComponent implements OnInit {
  listaSanciones: Sancion[] = [];
  correo?: string;
  private usuario!: Usuario;
  comunidad!: Comunidad;
  vecinosMap: { [id: number]: Vecino } = {};

  constructor(private router: Router,
              private sancionService: SancionService,
              private usuarioService: UsuarioService,
              private comunidadService: ComunidadService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/documentacion/comunidad') {
          this.inicio();
        }
      });
  }

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

  ionViewWillEnter() {
    this.listarSanciones();
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
          this.listarSanciones();
        }
      });
    }
  }

  listarSanciones() {
    if (this.comunidad.id) {
      this.sancionService.listarSancionesComunidad(this.comunidad.id).subscribe({
        next: data => {
          this.listaSanciones = data;

          const idsVecinos = [...new Set(this.listaSanciones.map(s => s.idVecino))];
          idsVecinos.forEach(idVecino => {
            if (idVecino) {
              this.comunidadService.cargarVecinoPorIdVecinoComunidad(idVecino).subscribe({
                next: vecino => {
                  this.vecinosMap[idVecino] = vecino;
                },
                error: err => {
                  console.error(`Error al cargar vecino ${idVecino}:`, err);
                }
              });
            }
          });
        }
      });
    }
  }

  navigateToCrearSancion() {
    this.router.navigate(['crear-sancion-comunidad']);
  }

  protected readonly String = String;
}

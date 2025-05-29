import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {QuillModule} from "ngx-quill";
import {NavigationEnd, Router} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Comunicado} from "../../modelos/Comunicado";
import {Comunidad} from "../../modelos/Comunidad";
import {ComunicadoService} from "../../servicios/comunicado.service";
import {filter} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {Usuario} from "../../modelos/Usuario";
import {UsuarioService} from "../../servicios/usuario.service";
import {ComunidadService} from "../../servicios/comunidad.service";
import {VecinoService} from "../../servicios/vecino.service";
import {Vecino} from "../../modelos/Vecino";

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styleUrls: ['./comunicados.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    QuillModule,
    NgIf
  ]
})
export class ComunicadosComponent  implements OnInit {
  listaComunicado: Comunicado[] = []
  correo?: string;
  private usuario!: Usuario
  comunidad!: Comunidad

  vecinosMap: { [id: number]: Vecino } = {};

  constructor(private router: Router,
              private comunicadoService: ComunicadoService,
              private sanitizer: DomSanitizer,
              private usuarioService: UsuarioService,
              private comunidadService: ComunidadService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/documentacion/comunidad') {
          this.inicio()
        }
      });
  }

  ngOnInit() {
    this.inicio()
  }

  htmlSeguro(descripcion: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion)
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
          this.listarComunicados()
        }
      })
    }
  }

  listarComunicados() {
    if (this.comunidad.id) {
      this.comunicadoService.listarComunicadosComunidad(this.comunidad.id).subscribe({
        next: data => {
          this.listaComunicado = data.sort((a, b) => {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
          });

          const idsVecinos = [...new Set(this.listaComunicado.map(c => c.idVecino))];
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

  formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);

    const esMismaFecha = (a: Date, b: Date): boolean =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (esMismaFecha(fecha, hoy)) {
      return 'Hoy';
    } else if (esMismaFecha(fecha, ayer)) {
      return 'Ayer';
    } else {
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      const dia = fecha.getDate();
      const mes = meses[fecha.getMonth()];
      const año = fecha.getFullYear();
      return `${dia} de ${mes} de ${año}`;
    }
  }

  navigateToCrearComunicado(){
    this.router.navigate(['crear-comunicado-comunidad']);
  }
}

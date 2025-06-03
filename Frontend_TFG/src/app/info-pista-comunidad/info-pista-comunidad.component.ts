import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Usuario} from "../modelos/Usuario";
import {Comunidad} from "../modelos/Comunidad";
import {Pista} from "../modelos/Pista";
import {ComunidadService} from "../servicios/comunidad.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {PistaService} from "../servicios/pista.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {HorarioCompleto} from "../modelos/HorarioCompleto";
import {IonicModule} from "@ionic/angular";
import {Gasto} from "../modelos/Gasto";
import {HeaderComponent} from "../header/header.component";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";

@Component({
    selector: 'app-info-pista-comunidad',
    templateUrl: './info-pista-comunidad.component.html',
    styleUrls: ['./info-pista-comunidad.component.scss'],
    standalone: true,
  imports: [
    NgForOf,
    NgClass,
    IonicModule,
    HeaderComponent,
    MenuInferiorComunidadComponent,
    NgIf
  ]
})
export class InfoPistaComunidadComponent  implements OnInit {
  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  listaHorarios: HorarioCompleto[] = []
  idPista!: number;
  pista: Pista = {} as Pista;
  estadoHorarios: Record<string, 'libre' | 'ocupado' > = {};
  seleccionadas: string[] = [];
  listaHoras: string[] = [];
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];

  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private pistaService: PistaService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.idPista = Number(params['id']);
      const hoy = new Date().toISOString().split('T')[0];
      this.listarHorarios(hoy);
      this.verPista();
    });

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
        }
      })
    }
  }

  listarHorarios(fecha: string) {
    if (this.idPista) {
      this.pistaService.obtenerHorarios(this.idPista, fecha).subscribe({
        next: data => {
          this.listaHorarios = data.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

          this.listaHoras = this.listaHorarios.map(h => `${h.horaInicio} - ${h.horaFin}`);

          this.estadoHorarios = {};
          this.listaHorarios.forEach(h => {
            this.estadoHorarios[h.id] = h.reservado ? 'ocupado' : 'libre';
          });

          this.seleccionadas = [];
        },
        error: err => {
          console.error('Error al cargar horarios:', err);
        }
      });
    }
  }


  verPista() {
    if (this.idPista) {
      this.pistaService.verPista(this.idPista).subscribe({
        next: data => {
          this.pista = data;
        }
      });
    }
  }

  getEstadoClase(idHorario: number): string {
    if (this.seleccionadas.includes(String(idHorario))) {
      return 'seleccionado';
    }
    return this.estadoHorarios[idHorario];
  }

  toggleSeleccion(idHorario: number) {
    const idStr = String(idHorario);

    if (this.estadoHorarios[idHorario] !== 'libre') return;

    if (this.seleccionadas.includes(idStr)) {
      this.seleccionadas = this.seleccionadas.filter(id => id !== idStr);
    } else {
      this.seleccionadas.push(idStr);
    }
  }

  cogerFecha(event: any) {
    const fecha = event.detail.value;
    if (fecha) {
      this.fechaSeleccionada = fecha;
      this.listarHorarios(fecha);
    }
  }

  volverAtras(): void {
    this.router.navigate(['/ver-pistas']);
  }
}


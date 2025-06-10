import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
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
import {Reserva} from "../../modelos/Reserva";
import {ReservaService} from "../../servicios/reserva.service";
import {Vecino} from "../../modelos/Vecino";
import {VecinoService} from "../../servicios/vecino.service";
import {VecinoUsuarioDTO} from "../../modelos/VecinoUsuarioDTO";

@Component({
    selector: 'app-reservas',
    templateUrl: './reservas.component.html',
    styleUrls: ['./reservas.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    NgIf,
    DatePipe
  ]
})
export class ReservasComponent  implements OnInit {
  private usuario!: Usuario
  private comunidad!: Comunidad
  listaReserva: Reserva[] = []
  vecinosMap = new Map<number, string>();
  vecino!: Vecino

  correo!: string
  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private propiedadService: PropiedadService,
              private comunidadService: ComunidadService,
              private reservaService: ReservaService,
              private vecinoService: VecinoService) { }

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
          this.comunidad = data;
          this.listarReservas();
        }
      })
    }
  }

  listarReservas() {
    if (!this.comunidad?.id) return;

    this.reservaService.listarReservaComunidad(this.comunidad.id).subscribe({
      next: data => {
        this.listaReserva = data;
        const idsVecinoUnicos = [...new Set(data.map(r => r.idVecino))];

        idsVecinoUnicos.forEach(id => {
          if (id != null) {
            this.comunidadService.cargarVecinoPorIdVecinoComunidad(id).subscribe({
              next: vecino => {
                const nombreCompleto = `${vecino.nombre} ${vecino.apellidos}`;
                if (id != null) {
                  this.vecinosMap.set(id, nombreCompleto);
                }
              },
              error: () => {
                if (id != null) {
                  this.vecinosMap.set(id, "No encontrado");
                }
              }
            });
          }
        });
      }
    });
  }

  obtenerNombreVecino(idVecino: number | undefined): string {
    return this.vecinosMap.get(<number>idVecino) ?? "Cargando...";
  }

}

import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Comunidad} from "../modelos/Comunidad";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {PistaHorario} from "../modelos/PistaHorario";
import {Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {PistaService} from "../servicios/pista.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {ReservaService} from "../servicios/reserva.service";
import {Reserva} from "../modelos/Reserva";

@Component({
    selector: 'app-ver-resevas-club',
    templateUrl: './ver-resevas-club.component.html',
    styleUrls: ['./ver-resevas-club.component.scss'],
    standalone: true,
  imports: [
    FooterComunidadComponent,
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    NgForOf,
    NgIf,
    DatePipe
  ]
})
export class VerResevasClubComponent  implements OnInit {
  comunidadObjeto!: Comunidad
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string
  listaReserva: Reserva[] = []

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private reservaService: ReservaService) {
  }

  ngOnInit() {}

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
          this.listarReserva();
        }
      })
    }
  }

  listarReserva() {
    if (this.comunidadObjeto?.id)
      this.reservaService.listarReserva(this.vecino.id, this.comunidadObjeto.id).subscribe({
        next: data => {
          this.listaReserva = data
        }
      })
  }

  volverAtras(): void {
    this.router.navigate(['/club-social']);
  }
}

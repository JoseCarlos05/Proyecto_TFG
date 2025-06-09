import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Usuario} from "../../modelos/Usuario";
import {Vecino} from "../../modelos/Vecino";
import {Comunidad} from "../../modelos/Comunidad";
import {SancionService} from "../../servicios/sancion.service";
import {UsuarioService} from "../../servicios/usuario.service";
import {VecinoService} from "../../servicios/vecino.service";
import {ElementoCartaService} from "../../servicios/elemento-carta.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {ReservaService} from "../../servicios/reserva.service";
import {CrearEleccion} from "../../modelos/CrearEleccion";
import {Reserva} from "../../modelos/Reserva";
import {TipoNotificacion} from "../../modelos/Notificacion";

@Component({
    selector: 'app-reserva-vecino',
    templateUrl: './reserva-vecino.component.html',
    styleUrls: ['./reserva-vecino.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    NgIf,
    FormsModule
  ]
})
export class ReservaVecinoComponent  implements OnInit {
  private usuario!: Usuario
  private vecino!: Vecino
  correo?: string
  comunidadObjeto?: Comunidad
  fecha: string = '';
  hora: string = '';

  reservar: Reserva = {
    id: undefined,
    numeroPersonas: "",
    fechaHora: "",
    idVecino: undefined,
    idComunidad: undefined
  }

  constructor(private sancionService: SancionService,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private reservaService: ReservaService) { }

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
          this.vecino = data
        }
      })
    }
  }

  reservarMetodo() {
    this.reservar.idVecino = this.vecino.id;
    this.reservar.idComunidad = this.comunidadObjeto?.id;

    if (!this.reservar.fechaHora || !this.reservar.numeroPersonas || !this.reservar.idComunidad) {
      const toast = document.getElementById("campoVacio") as any;
      toast.present();
      return;
    }

    const ahora = new Date();
    const fechaEleccion = new Date(this.reservar.fechaHora);

    if (fechaEleccion <= ahora) {
      const toast = document.getElementById("diaIncorrecto") as any;
      toast.present();
      return;
    }

    this.reservaService.reservarClub(this.reservar).subscribe({
      next: () => {
        const toast = document.getElementById("exitoCreacion") as any;
        toast.present();

        this.reservar = {
          numeroPersonas: '',
          fechaHora: '',
          idVecino: this.vecino.id,
          idComunidad: this.comunidadObjeto?.id
        };
        this.fecha = '';
        this.hora = '';
      },
      error: () => {
        console.log('Error al lanzar la elección.');
      }
    });
  }


  actualizarFechaHora() {
    if (this.fecha && this.hora) {
      const horaSolo = this.hora.split('T')[1]?.substring(0, 5);
      this.reservar.fechaHora = `${this.fecha}T${horaSolo}`;
    }
  }

}

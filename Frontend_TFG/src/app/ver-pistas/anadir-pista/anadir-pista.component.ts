import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {Usuario} from "../../modelos/Usuario";
import {Comunidad} from "../../modelos/Comunidad";
import {CrearEleccion} from "../../modelos/CrearEleccion";
import {ComunidadService} from "../../servicios/comunidad.service";
import {Router} from "@angular/router";
import {UsuarioService} from "../../servicios/usuario.service";
import {EleccionesService} from "../../servicios/elecciones.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {CrearPista} from "../../modelos/CrearPista";
import {PistaService} from "../../servicios/pista.service";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-anadir-pista',
    templateUrl: './anadir-pista.component.html',
    styleUrls: ['./anadir-pista.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    NgForOf
  ]
})
export class AnadirPistaComponent  implements OnInit {
  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  horaInicio: string = '';
  horaFin: string = '';
  nuevaHoraInicio: string = '';
  nuevaHoraFin: string = '';


  crearPista: CrearPista = {
    deporte: "",
    horarios: [],
    idComunidad: undefined
  }
  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private eleccionService: EleccionesService,
              private pistaService: PistaService) { }

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
          this.crearPista.idComunidad = this.comunidad.id;
        }
      })
    }
  }
  crearEleccionMetodo() {
    if (!this.crearPista.deporte || !this.crearPista.diasRepetir) {
      const toast = document.getElementById("campoVacio") as any;
      toast?.present();
      return;
    }
    if (this.crearPista.diasRepetir < 1) {
      const toast = document.getElementById("min1") as any;
      toast.present();
      return;
    }


    this.actualizarFechaHora();

    console.log('Pista enviada:', this.crearPista);

    this.pistaService.crearPista(this.crearPista).subscribe({
      next: () => {
        const toast = document.getElementById("exitoCreacion") as any;
        toast?.present();
        this.crearPista = {
          deporte: '',
          horarios: [],
          idComunidad: this.comunidad?.id
        };
        this.horaInicio = '';
        this.horaFin = '';
      },
      error: () => {
        console.log('Error al lanzar la creación de la pista.');
      }
    });
  }

  agregarHorario() {
    if (this.nuevaHoraInicio && this.nuevaHoraFin && this.nuevaHoraInicio < this.nuevaHoraFin) {
      this.crearPista.horarios.push({
        horaInicio: this.nuevaHoraInicio,
        horaFin: this.nuevaHoraFin
      });

      this.nuevaHoraInicio = '';
      this.nuevaHoraFin = '';
    } else {
      const toast = document.getElementById("diaIncorrecto") as any;
      toast?.present();
    }
  }

  eliminarHorario(index: number) {
    this.crearPista.horarios.splice(index, 1);
  }


  actualizarFechaHora() {
    if (this.horaInicio && this.horaFin) {
      const soloHoraInicio = this.horaInicio.substring(11, 16);
      const soloHoraFin = this.horaFin.substring(11, 16);

      this.crearPista.horarios = [{
        horaInicio: soloHoraInicio,
        horaFin: soloHoraFin
      }];
    }
  }


}

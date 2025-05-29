import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../modelos/Usuario";
import {Comunidad} from "../../modelos/Comunidad";
import {Gasto} from "../../modelos/Gasto";
import {ComunidadService} from "../../servicios/comunidad.service";
import {Router} from "@angular/router";
import {UsuarioService} from "../../servicios/usuario.service";
import {GastosService} from "../../servicios/gastos.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {VecinoDeuda} from "../../modelos/VecinoDeuda";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TipoNotificacion} from "../../modelos/Notificacion";

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CurrencyPipe,
    FormsModule
  ]
})
export class DeudoresComponent  implements OnInit {
  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  vecinoDeudas: VecinoDeuda[] = []
  modalAbierto = false;
  vecinoSeleccionado: VecinoDeuda | null = null;
  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private gastosService: GastosService) { }

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
          this.listarDeudores()
        }
      })
    }
  }

  listarDeudores() {
    if (this.comunidad.id)
      this.gastosService.listarDeudoresIdComunidad(this.comunidad.id).subscribe({
        next: data => {
          this.vecinoDeudas = data
        }
      })
  }

  abrirModal(vecinoDeuda: VecinoDeuda): void {
    if (this.vecinoSeleccionado == null) {
      this.vecinoSeleccionado = vecinoDeuda;
    }    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.vecinoSeleccionado = null;
  }

  aceptar(vecinoId: number): void {
    const ids: number[] = [vecinoId]
    console.log(ids)
    this.comunidadService.enviarNotificacion(ids, this.comunidad.id, TipoNotificacion.DEUDA).subscribe({
        next: () => this.cerrarModal()
    })
  }
}

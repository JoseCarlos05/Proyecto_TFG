import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Usuario} from "../../modelos/Usuario";
import {Comunidad} from "../../modelos/Comunidad";
import {CrearGasto} from "../../modelos/CrearGasto";
import {ComunidadService} from "../../servicios/comunidad.service";
import {Router} from "@angular/router";
import {UsuarioService} from "../../servicios/usuario.service";
import {GastosService} from "../../servicios/gastos.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {Gasto} from "../../modelos/Gasto";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-gastos',
    templateUrl: './gastos.component.html',
    styleUrls: ['./gastos.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    NgIf,
    NgClass,
  ]
})
export class GastosComponent implements OnInit {
  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  listaGastos: Gasto[] = []

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

  ionViewWillEnter() {
    this.listarGastos()
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
          this.listarGastos()
        }
      })
    }
  }
  listarGastos() {
    if (this.comunidad.id)
      this.gastosService.listarGastosComunidad(this.comunidad.id).subscribe({
        next: data => {
          this.listaGastos = data
          console.log(this.listaGastos)
        }
      })
  }

  comprobarEstado(gasto: Gasto): string {
    if (gasto.total === gasto.cantidadPagada) {
      return "Pagado"
    }
    return "Pendiente"
  }
}

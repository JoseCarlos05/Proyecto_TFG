import {Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {GastosService} from "../servicios/gastos.service";
import {Gasto} from "../modelos/Gasto";
import {InsertarCodigo} from "../modelos/InsertarCodigo";
import {MarcarPagado} from "../modelos/MarcarPagado";

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ExitoComponent implements OnInit {
  gastoObjeto!: Gasto;
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private gastoService: GastosService) {}

  marcarPagado: MarcarPagado = {
    idVecino: undefined,
    idGasto: undefined
  }

  ngOnInit() {
    const gasto = sessionStorage.getItem('gastoStorage');
    if (gasto) {
      this.gastoObjeto = JSON.parse(gasto);
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
          this.marcarPagado.idVecino = this.vecino.id;
          this.marcarPagado.idGasto = this.gastoObjeto.id;

          this.marcarPagadoMetodo();
        }
      })
    }
  }

  marcarPagadoMetodo() {
    this.gastoService.marcarPagado(this.marcarPagado).subscribe({
      next: () => {
        console.log(this.marcarPagado)
        sessionStorage.removeItem('gastoStorage');
      },
      error: () => {
        console.log('Error al insertar codigo.');
      }
    });
  }

  volverHome() {
    this.router.navigate(['comunidad/gastos']);
  }
}

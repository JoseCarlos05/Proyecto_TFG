import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {Comunidad} from "../modelos/Comunidad";
import {Gasto} from "../modelos/Gasto";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GastosService} from "../servicios/gastos.service";
import {ViviendaService} from "../servicios/vivienda.service";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {filter} from "rxjs";

@Component({
  selector: 'app-info-pista',
  templateUrl: './info-pista.component.html',
  styleUrls: ['./info-pista.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ]
})
export class InfoPistaComponent  implements OnInit {
  comunidadObjeto!: Comunidad
  gasto: Gasto = {} as Gasto;
  idGasto!: number;
  numeroPropietarios: number = 0;
  totalPorVecino: number = 0;
  porcentajePagado: number = 0;
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string
  constructor(private router: Router,
              private gastosService: GastosService,
              private activateRoute: ActivatedRoute,
              private viviendaService: ViviendaService,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.idGasto = Number(params['id']);
    });

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
        }
      })
    }
  }


}

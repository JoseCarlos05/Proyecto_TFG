import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
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
import {Pista} from "../modelos/Pista";
import {PistaService} from "../servicios/pista.service";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";

@Component({
    selector: 'app-ver-pistas-vecino',
    templateUrl: './ver-pistas-vecino.component.html',
    styleUrls: ['./ver-pistas-vecino.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgForOf,
        HeaderComponent,
        HeaderComunidadComponent,
        FooterComunidadComponent,
        NgIf
    ]
})
export class VerPistasVecinoComponent  implements OnInit {
  comunidadObjeto!: Comunidad
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string
  listaPista: Pista[] = []

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private pistaService: PistaService) {
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
          this.listarPistas()
        }
      })
    }
  }

  listarPistas() {
    if (this.comunidadObjeto?.id)
      this.pistaService.listarPistasVecino(this.comunidadObjeto.id).subscribe({
        next: data => {
          this.listaPista = data
        }
      })
  }

  navigateToInfoPista(idPista: number) {
    this.router.navigate(['info-pista', idPista])
  }

  navigateToVerReservas() {
    this.router.navigate(['ver-reservas-vecino'])
  }
}

import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../modelos/Usuario";
import {Comunidad} from "../../modelos/Comunidad";
import {Gasto} from "../../modelos/Gasto";
import {ComunidadService} from "../../servicios/comunidad.service";
import {NavigationEnd, Router} from "@angular/router";
import {UsuarioService} from "../../servicios/usuario.service";
import {GastosService} from "../../servicios/gastos.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {PistaService} from "../../servicios/pista.service";
import {Pista} from "../../modelos/Pista";
import {HeaderComponent} from "../../header/header.component";
import {MenuInferiorComunidadComponent} from "../../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {filter} from "rxjs";

@Component({
  selector: 'app-pistas',
  templateUrl: './pistas.component.html',
  styleUrls: ['./pistas.component.scss'],
  standalone: true,
    imports: [
        IonicModule,
        NgForOf,
        NgIf
    ]
})
export class PistasComponent  implements OnInit {
  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  listaPista: Pista[] = []
  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private pistaService: PistaService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/ver-pistas') {
          this.inicio()
        }
      });
  }

  ngOnInit() {
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
          this.listarPistas()
        }
      })
    }
  }
  listarPistas() {
    if (this.comunidad.id)
      this.pistaService.listarPistas(this.comunidad.id).subscribe({
        next: data => {
          this.listaPista = data
        }
      })
  }

  navigateToInfoPista(idPista: number) {
    this.router.navigate(['info-pista-comunidad', idPista])
  }

}

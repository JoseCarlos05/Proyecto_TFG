import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import { jwtDecode } from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {UsuarioService} from "../servicios/usuario.service";
import {Usuario} from "../modelos/Usuario";
import {VecinoService} from "../servicios/vecino.service";
import {Vecino} from "../modelos/Vecino";
import {ComunidadService} from "../servicios/comunidad.service";
import {Comunidad} from "../modelos/Comunidad";

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.scss'],
  imports: [IonicModule, CommonModule, FooterComponent, HeaderComponent],
  standalone: true,
})
export class ComunidadesComponent implements OnInit {

  private usuario!: Usuario
  private vecino!: Vecino
  listaComunidades: Comunidad[] = []
  correo!: string

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private comunidadService: ComunidadService) { }

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
          this.listarComunidades()
        }
      })
    }
  }

  listarComunidades() {
    if (this.vecino.id)
    this.comunidadService.listarComunidades(this.vecino.id).subscribe({
      next: data => this.listaComunidades = data
    })
  }

  navigateToComunidad(comunidad: Comunidad) {
    if (comunidad?.id) {
      sessionStorage.setItem('comunidad', JSON.stringify(comunidad));
      this.router.navigate(['/comunidad/elecciones']);
    }
  }

}

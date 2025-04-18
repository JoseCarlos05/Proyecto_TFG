import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import { jwtDecode } from "jwt-decode";
import {TokenData} from "../modelos/TokenData";
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

  private usuario: Usuario = {}
  private vecino: Vecino = {}
  listaComunidades: Comunidad[] = []

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private comunidadService: ComunidadService) { }

  ngOnInit() {
    this.decodificarToken()
  }

  decodificarToken() {
    const token = sessionStorage.getItem('token');

    try {
      if (token) {
        const decodedToken = jwtDecode(token) as { tokenData: TokenData };
        this.cargarUsuario(decodedToken?.tokenData.correo)
      }
    } catch (e) {
      console.error('Error al decodificar el token:');
    }
  }

  cargarUsuario(correo: string) {
    this.usuarioService.cargarUsuario(correo).subscribe({
      next: data => {
        this.usuario = data
        if (this.usuario.id)
        this.cargarVecino(this.usuario.id)
      }
    })
  }

  cargarVecino(idUsuario: number) {
    if (this.usuario.id)
    this.vecinoService.cargarVecinoPorIdUsuario(this.usuario.id).subscribe({
      next: data => {
        this.vecino = data
        this.listarComunidades()
      }
    })
  }

  listarComunidades() {
    if (this.vecino.id)
    this.comunidadService.listarComunidades(this.vecino.id).subscribe({
      next: data => this.listaComunidades = data
    })
  }

  navigateToComunidad(id: number | undefined) {
    if (id)
    this.router.navigate(['/comunidad', id, 'elecciones']);
  }
}

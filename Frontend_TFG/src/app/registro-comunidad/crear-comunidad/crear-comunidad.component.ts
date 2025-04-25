import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {Login} from "../../modelos/Login";
import {AuthService} from "../../servicios/auth.service";
import {RegistrarComunidad} from "../../modelos/RegistrarComunidad";
import {FormsModule} from "@angular/forms";
import {Usuario} from "../../modelos/Usuario";
import {Vecino} from "../../modelos/Vecino";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {UsuarioService} from "../../servicios/usuario.service";
import {VecinoService} from "../../servicios/vecino.service";

@Component({
    selector: 'app-crear-comunidad',
    templateUrl: './crear-comunidad.component.html',
    styleUrls: ['./crear-comunidad.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class CrearComunidadComponent  implements OnInit {

  private usuario!: Usuario
  private vecino!: Vecino
  correo?: string

  registroComunidad: RegistrarComunidad = {
    nombre: "",
    direccion: "",
    numCuenta: "",
    banco: "",
    cif: "",
    idPresidente: 0,
    correo: "",
    contrasena: "",
  }

  constructor(private router: Router, private authService: AuthService, private usuarioService: UsuarioService, private vecinoService: VecinoService) { }

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

  navigateToComunidades() {
    if (this.vecino) {
      this.registroComunidad.idPresidente = this.vecino.id

      if (this.registroComunidad) {
        this.authService.registroComunidad(this.registroComunidad).subscribe({
          next: () => this.router.navigate(['/comunidades']),
          error: error => console.log(error),
        })
      }
    }
  }
}

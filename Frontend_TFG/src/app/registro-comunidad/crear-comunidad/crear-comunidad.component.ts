import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { Login } from "../../modelos/Login";
import { AuthService } from "../../servicios/auth.service";
import { RegistrarComunidad } from "../../modelos/RegistrarComunidad";
import { FormsModule } from "@angular/forms";
import { Usuario } from "../../modelos/Usuario";
import { Vecino } from "../../modelos/Vecino";
import { jwtDecode } from "jwt-decode";
import { TokenDataDTO } from "../../modelos/TokenData";
import { UsuarioService } from "../../servicios/usuario.service";
import { VecinoService } from "../../servicios/vecino.service";

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
export class CrearComunidadComponent implements OnInit {

  private usuario!: Usuario;
  private vecino!: Vecino;
  correo?: string;
  repetirContrasena: string = ""

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private vecinoService: VecinoService
  ) { }

  ngOnInit(): void {
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
          this.cargarVecino();
        }
      },
      error: (e) => {
        console.error("Error al cargar el usuario:", e);
      }
    });
  }

  cargarVecino(): void {
    if (this.usuario.id) {
      this.vecinoService.cargarVecinoPorIdUsuario(this.usuario.id).subscribe({
        next: data => {
          this.vecino = data;
        }
      });
    }
  }

  async presentToast(id: string): Promise<void> {
    const toast = document.getElementById(id) as any;
    if (toast) {
      await toast.present();
    }
  }

  navigateToComunidades(): void {
    if (this.vecino) {
      if (
        !this.registroComunidad.nombre ||
        !this.registroComunidad.correo ||
        !this.registroComunidad.contrasena ||
        !this.registroComunidad.direccion ||
        !this.registroComunidad.numCuenta ||
        !this.registroComunidad.cif ||
        !this.registroComunidad.banco

    ) {
        const toast = document.getElementById("toastacio") as any;
        toast.present();
        return;
      }

      if (this.registroComunidad.nombre.trim().length < 2) {
        const toast = document.getElementById("toastNombre") as any;
        toast.present();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.registroComunidad.correo)) {
        const toast = document.getElementById("toastCorreo") as any;
        toast.present();
        return;
      }

      if (this.registroComunidad.contrasena.length < 6) {
        const toast = document.getElementById("toastContrasena") as any;
        toast.present();
        return;
      }

      if (this.registroComunidad.contrasena !== this.repetirContrasena) {
        const toast = document.getElementById("errorConfirmarContrasena") as any;
        toast.present();
        return;
      }


      if (this.registroComunidad.numCuenta.trim().length < 20) {
        const toast = document.getElementById("toastCuenta") as any;
        toast.present();
        return;
      }

      const regexCIF =/^[A-Za-z][0-9]{8}$/;

      if (!regexCIF.test(this.registroComunidad.cif.trim())) {
        const toast = document.getElementById("toastCif") as any;
        if (toast) toast.present();
        return;
      }


      this.registroComunidad.idPresidente = this.vecino.id;

      if (this.registroComunidad) {
        this.authService.registroComunidad(this.registroComunidad).subscribe({
          next: () => {
            this.presentToast("toastRegistroExitoso");
            this.router.navigate(['/comunidades']);
          },
          error: error => {
            console.log(error);
            this.presentToast("toastError");
          },
        });
      }
    }
  }

  volverAtras(): void {
    this.router.navigate(['/comunidades']);
  }
}

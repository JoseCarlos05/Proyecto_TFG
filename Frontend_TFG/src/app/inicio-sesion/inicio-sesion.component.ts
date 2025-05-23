import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Login } from "../modelos/Login";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../servicios/auth.service";
import { jwtDecode } from "jwt-decode";
import { TokenDataDTO } from "../modelos/TokenData";

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class InicioSesionComponent implements OnInit {

  formLogin: Login = {
    correo: "",
    contrasena: ""
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  navigateToRegistro() {
    this.router.navigate(['/registro']);
  }

  navigateToOlvidarContrasena() {
    this.router.navigate(['/olvidar-contrasena']);
  }

  login() {
    if (!this.formLogin.correo || !this.formLogin.contrasena) {
      this.presentToast("toastCamposVacios");
      return;
    }

    this.authService.login(this.formLogin).subscribe({
      next: data => {
        const token = data.token;
        sessionStorage.setItem("authToken", token);
        this.authService.setAuthState(true);

        try {
          const decodedToken = jwtDecode(token) as { tokenDataDTO: TokenDataDTO };
          const rol = decodedToken?.tokenDataDTO.rol;

          if (rol === "VECINO") {
            this.router.navigate(['/comunidades']);
            this.presentToast("toastExito");
          } else if (rol === "COMUNIDAD") {
            this.router.navigate(['/lista-viviendas']);
            this.presentToast("toastExito");
          }
        } catch (e) {
          this.presentToast("toastLoginIncorrecto");
        }
      },
      error: err => {
        this.presentToast("toastLoginIncorrecto");
      }
    })
  }

  async presentToast(id: string) {
    const toast = document.getElementById(id) as any;
    if (toast) {
      await toast.present();
    }
  }
}

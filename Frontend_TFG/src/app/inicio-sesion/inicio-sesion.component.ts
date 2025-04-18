import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {Login} from "../modelos/Login";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../servicios/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
    selector: 'app-inicio-sesion',
    templateUrl: './inicio-sesion.component.html',
    styleUrls: ['./inicio-sesion.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
    standalone: true,
})
export class InicioSesionComponent  implements OnInit {

  formLogin: Login = {
    correo: "",
    contrasena: ""
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  navigateToRegistro() {
    this.router.navigate(['/registro']);
  }

  navigateToComunidades() {
    this.router.navigate(['/comunidades']);
  }

  login() {
    this.authService.login(this.formLogin).subscribe({
      next: data => {
        const token = data.token;
        sessionStorage.setItem("authToken", token);
        this.authService.setAuthState(true);
        this.navigateToComunidades()
      }, error: err => {
        console.log(err)
      }
    })
  }

}

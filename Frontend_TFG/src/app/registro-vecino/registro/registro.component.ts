import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../servicios/auth.service";
import {Login} from "../../modelos/Login";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistroComponent  implements OnInit {

  datosRegistro: Login = {
    correo: "",
    contrasena: ""
  }

  repetirContrasena: string = ""

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.datosRegistro.correo = ""
    this.datosRegistro.contrasena = ""
    this.repetirContrasena = ""
  }

  navigateToInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }

  navigateToConfigPerfilVecino() {
    this.authService.setDatos(this.datosRegistro);
    this.router.navigate(['/config-perfil-vecino']);
  }
}

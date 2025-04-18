import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {RegistrarVecino} from "../modelos/RegistrarVecino";
import {AuthService} from "../servicios/auth.service";
import {Login} from "../modelos/Login";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-config-perfil-vecino',
    templateUrl: './config-perfil-vecino.component.html',
    styleUrls: ['./config-perfil-vecino.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class ConfigPerfilVecinoComponent implements OnInit {

  private datos: Login = {
    correo: "",
    contrasena: ""
  }

  registroVecino: RegistrarVecino = {
    nombre: "",
    apellidos: "",
    telefono: "",
    fechaNacimiento: "",
    numeroCuenta: "",
    dni: "",
    correo: this.datos.correo,
    contrasena: this.datos.contrasena,
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.datos = this.authService.getDatos()
    this.registroVecino.correo = this.datos.correo;
    this.registroVecino.contrasena = this.datos.contrasena;
  }

  navigateToInicioSesion() {
    if (this.registroVecino) {
      this.authService.registroVecino(this.registroVecino).subscribe({
        next: data => console.log("Usuario registrado: " + data),
        error: error => console.log(this.registroVecino),
      })
    }
    this.router.navigate(['/inicio-sesion']);
  }
}

import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {Login} from "../../modelos/Login";
import {AuthService} from "../../servicios/auth.service";
import {RegistrarComunidad} from "../../modelos/RegistrarComunidad";
import {FormsModule} from "@angular/forms";

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

  datosRegistro: Login = {
    correo: "",
    contrasena: ""
  }

  registroComunidad: RegistrarComunidad = {
    nombre: "",
    direccion: "",
    numCuenta: "",
    banco: "",
    cif: "",
    correo: this.datosRegistro.correo,
    contrasena: this.datosRegistro.contrasena,
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  navigateToComunidades() {
    this.registroComunidad.correo = this.datosRegistro.correo;
    this.registroComunidad.contrasena = this.datosRegistro.contrasena;
    if (this.registroComunidad) {
      this.authService.registroComunidad(this.registroComunidad).subscribe({
        next: () => this.router.navigate(['/comunidades']),
        error: error => console.log(error),
      })
    }
  }
}

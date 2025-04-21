import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {Login} from "../../modelos/Login";
import {RegistrarVecino} from "../../modelos/RegistrarVecino";
import {RegistrarComunidad} from "../../modelos/RegistrarComunidad";
import {AuthService} from "../../servicios/auth.service";

@Component({
    selector: 'app-crear-comunidad-2',
    templateUrl: './crear-comunidad-2.component.html',
    styleUrls: ['./crear-comunidad-2.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class CrearComunidad2Component  implements OnInit {

  private datos: Login = {
    correo: "",
    contrasena: ""
  }

  registroComunidad: RegistrarComunidad = {
    nombre: "",
    direccion: "",
    numCuenta: "",
    banco: "",
    cif: "",
    correo: this.datos.correo,
    contrasena: this.datos.contrasena,
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.datos = this.authService.getDatos()
    this.registroComunidad.correo = this.datos.correo;
    this.registroComunidad.contrasena = this.datos.contrasena;
  }

  navigateToComunidades() {
    if (this.registroComunidad) {
      this.authService.registroComunidad(this.registroComunidad).subscribe({
        next: () => this.router.navigate(['/comunidades']),
        error: error => console.log(error),
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {RegistrarVecino} from "../modelos/RegistrarVecino";
import {AuthService} from "../servicios/auth.service";

@Component({
    selector: 'app-config-perfil-vecino',
    templateUrl: './config-perfil-vecino.component.html',
    styleUrls: ['./config-perfil-vecino.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class ConfigPerfilVecinoComponent implements OnInit {

  private datos: any = {}

  registroVecino: RegistrarVecino = {
    nombre: "",
    apellidos: "",
    telefono: "",
    fechaNacimiento: "",
    numeroCuenta: "",
    dni: "",
    correo: this.datos.correo.value,
    contrasena: this.datos.contrasena.value,
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.datos = this.authService.getDatos()
  }

  navigateToInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }

  navigateToComunidades() {
    console.log(this.registroVecino)
    this.router.navigate(['/comunidades']);
  }
}

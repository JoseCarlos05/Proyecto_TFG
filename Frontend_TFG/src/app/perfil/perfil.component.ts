import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true,
})
export class PerfilComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }

  navigateToPantallaPrincipal() {
    this.router.navigate(['/pantalla-principal']);
  }
}

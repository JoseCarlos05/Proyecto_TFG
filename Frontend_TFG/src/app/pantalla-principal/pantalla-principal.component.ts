import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true,
})
export class PantallaPrincipalComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }
}

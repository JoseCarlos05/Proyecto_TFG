  import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
  imports: [IonicModule, CommonModule, FooterComponent, HeaderComponent],
    standalone: true,
})
export class PerfilComponent  implements OnInit {
  formLogin: any;

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }

  navigateToPantallaPrincipal() {
    this.router.navigate(['/pantalla-principal']);
  }
}

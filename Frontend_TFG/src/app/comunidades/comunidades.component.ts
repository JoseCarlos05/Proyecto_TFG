import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.scss'],
  imports: [IonicModule, CommonModule, FooterComponent],
  standalone: true,
})
export class ComunidadesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }
}

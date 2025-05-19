import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {Comunidad} from "../modelos/Comunidad";

@Component({
    selector: 'app-header-comunidad',
    templateUrl: './header-comunidad.component.html',
    styleUrls: ['./header-comunidad.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class HeaderComunidadComponent  implements OnInit {

  comunidadObjeto!: Comunidad
  constructor(private router: Router) { }

  ngOnInit() {
    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
    }
  }

  navigateToComunidades() {
    sessionStorage.removeItem('comunidad');
    this.router.navigate(['/comunidades']);
  }

  navigateToChat() {
    this.router.navigate(['/lista-vecinos']);
  }

  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }
}

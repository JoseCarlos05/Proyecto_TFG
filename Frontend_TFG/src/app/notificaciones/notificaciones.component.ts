import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {FooterComponent} from "../footer/footer.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    FooterComponent,
    FooterComunidadComponent,
    HeaderComunidadComponent
  ]
})
export class NotificacionesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

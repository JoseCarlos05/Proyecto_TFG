import { Component, OnInit } from '@angular/core';
import {CartaComponent} from "../club-social-comunidad/carta/carta.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {NgIf} from "@angular/common";
import {ReservasComponent} from "../club-social-comunidad/reservas/reservas.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {FormsModule} from "@angular/forms";
import {CartaVecinoComponent} from "./carta-vecino/carta-vecino.component";
import {VerReservasVecinoComponent} from "../ver-reservas-vecino/ver-reservas-vecino.component";

@Component({
    selector: 'app-club-social',
    templateUrl: './club-social.component.html',
    styleUrls: ['./club-social.component.scss'],
    standalone: true,
  imports: [
    CartaComponent,
    HeaderComponent,
    IonicModule,
    MenuInferiorComunidadComponent,
    NgIf,
    ReservasComponent,
    FooterComunidadComponent,
    FormsModule,
    CartaVecinoComponent,
    VerReservasVecinoComponent
  ]
})
export class ClubSocialComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  seccion: string = 'carta-vecino'

}

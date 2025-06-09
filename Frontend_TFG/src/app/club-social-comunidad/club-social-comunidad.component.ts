import { Component, OnInit } from '@angular/core';
import {ComunicadosComponent} from "../documentacion-comunidad/comunicados/comunicados.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {NgIf} from "@angular/common";
import {SancionesComponent} from "../documentacion-comunidad/sanciones/sanciones.component";
import {FormsModule} from "@angular/forms";
import {CartaComponent} from "./carta/carta.component";
import {ReservasComponent} from "./reservas/reservas.component";

@Component({
    selector: 'app-club-social-comunidad',
    templateUrl: './club-social-comunidad.component.html',
    styleUrls: ['./club-social-comunidad.component.scss'],
    standalone: true,
  imports: [
    ComunicadosComponent,
    HeaderComponent,
    IonicModule,
    MenuInferiorComunidadComponent,
    NgIf,
    SancionesComponent,
    FormsModule,
    CartaComponent,
    ReservasComponent
  ]
})
export class ClubSocialComunidadComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  seccion: string = 'carta'


}

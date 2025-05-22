import { Component } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-pista-padel',
  templateUrl: './pista-padel.component.html',
  styleUrls: ['./pista-padel.component.scss'],
  standalone: true,
  imports: [
    FooterComunidadComponent,
    HeaderComponent,
    IonicModule
  ]
})
export class PistaPadelComponent   {
  horas: string[] = [
    '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00'
  ];

  constructor() { }



}

import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-poner-sanciones',
  templateUrl: './poner-sanciones.component.html',
  styleUrls: ['./poner-sanciones.component.scss'],
  standalone: true,
  imports: [
    FooterComunidadComponent,
    HeaderComponent,
    IonicModule
  ]
})
export class PonerSancionesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

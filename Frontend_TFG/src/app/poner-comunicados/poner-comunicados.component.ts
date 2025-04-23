import { Component, OnInit } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";

@Component({
  selector: 'app-poner-comunicados',
  templateUrl: './poner-comunicados.component.html',
  styleUrls: ['./poner-comunicados.component.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    IonicModule,
    FooterComunidadComponent
  ]
})
export class PonerComunicadosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";

@Component({
    selector: 'app-propiedades-comunidades',
    templateUrl: './propiedades-comunidades.component.html',
    styleUrls: ['./propiedades-comunidades.component.scss'],
    standalone: true,
  imports: [
    FooterComunidadComponent,
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    MenuInferiorComunidadComponent
  ]
})
export class PropiedadesComunidadesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

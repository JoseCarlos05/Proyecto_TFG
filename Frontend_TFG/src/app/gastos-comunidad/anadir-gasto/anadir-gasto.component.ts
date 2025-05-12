import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../../header/header.component";
import {HeaderComunidadComponent} from "../../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {MenuInferiorComunidadComponent} from "../../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {Route, Router} from "@angular/router";

@Component({
    selector: 'app-anadir-gasto',
    templateUrl: './anadir-gasto.component.html',
    styleUrls: ['./anadir-gasto.component.scss'],
    standalone: true,
  imports: [
    FooterComunidadComponent,
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    MenuInferiorComunidadComponent
  ]
})
export class AnadirGastoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}


}

import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {FormsModule} from "@angular/forms";
import {AnadirGastoComponent} from "./anadir-gasto/anadir-gasto.component";
import {GastosComponent} from "./gastos/gastos.component";
import {DeudoresComponent} from "./deudores/deudores.component";

@Component({
    selector: 'app-gastos-comunidad',
    templateUrl: './gastos-comunidad.component.html',
    styleUrls: ['./gastos-comunidad.component.scss'],
    standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    NgIf,
    MenuInferiorComunidadComponent,
    FormsModule,
    GastosComponent,
    AnadirGastoComponent,
    DeudoresComponent
  ]
})
export class GastosComunidadComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  seccion: string = 'gastos'

}

import { Component, OnInit } from '@angular/core';
import {AnadirGastoComponent} from "../gastos-comunidad/anadir-gasto/anadir-gasto.component";
import {DeudoresComponent} from "../gastos-comunidad/deudores/deudores.component";
import {GastosComponent} from "../gastos-comunidad/gastos/gastos.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PistasComponent} from "./pistas/pistas.component";
import {AnadirPistaComponent} from "./anadir-pista/anadir-pista.component";
@Component({
    selector: 'app-ver-pistas',
    templateUrl: './ver-pistas.component.html',
    styleUrls: ['./ver-pistas.component.scss'],
    standalone: true,
  imports: [
    AnadirGastoComponent,
    DeudoresComponent,
    GastosComponent,
    HeaderComponent,
    IonicModule,
    MenuInferiorComunidadComponent,
    NgIf,
    FormsModule,
    PistasComponent,
    AnadirPistaComponent
  ]
})
export class VerPistasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  seccion: string = 'pistas'

}

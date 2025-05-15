import { Component, OnInit } from '@angular/core';
import {ComunicadosComponent} from "../documentacion/comunicados/comunicados.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";
import {SancionesComponent} from "../documentacion/sanciones/sanciones.component";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {FormsModule} from "@angular/forms";
import {AnadirGastoFormularioComponent} from "./anadir-gasto-formulario/anadir-gasto-formulario.component";
import {AnadirGastoComponent} from "./anadir-gasto/anadir-gasto.component";

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
    AnadirGastoFormularioComponent,
    AnadirGastoComponent
  ]
})
export class GastosComunidadComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  seccion: string = 'anadir-gasto'

}

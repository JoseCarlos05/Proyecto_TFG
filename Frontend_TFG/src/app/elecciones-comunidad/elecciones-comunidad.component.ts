import { Component, OnInit } from '@angular/core';
import {ComunicadosComponent} from "../documentacion/comunicados/comunicados.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";
import {SancionesComponent} from "../documentacion/sanciones/sanciones.component";
import {FormsModule} from "@angular/forms";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {LanzarEleccionComponent} from "./lanzar-eleccion/lanzar-eleccion.component";
import {ListarEleccionesComponent} from "./listar-elecciones/listar-elecciones.component";

@Component({
    selector: 'app-elecciones-comunidad',
    templateUrl: './elecciones-comunidad.component.html',
    styleUrls: ['./elecciones-comunidad.component.scss'],
    standalone: true,
  imports: [
    ComunicadosComponent,
    FooterComunidadComponent,
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    NgIf,
    SancionesComponent,
    FormsModule,
    MenuInferiorComunidadComponent,
    LanzarEleccionComponent,
    ListarEleccionesComponent
  ]
})
export class EleccionesComunidadComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  seccion: string = 'listar-elecciones'

}

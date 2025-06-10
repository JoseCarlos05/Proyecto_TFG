import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {FormsModule} from "@angular/forms";
import {ComunicadosComponent} from "./comunicados/comunicados.component";
import {SancionesComponent} from "./sanciones/sanciones.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-documentacion-comunidad',
  templateUrl: './documentacion-comunidad.component.html',
  styleUrls: ['./documentacion-comunidad.component.scss'],
  imports: [
    HeaderComponent,
    IonicModule,
    MenuInferiorComunidadComponent,
    FormsModule,
    ComunicadosComponent,
    SancionesComponent,
    NgIf
  ],
  standalone: true
})
export class DocumentacionComunidadComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  seccion: string = 'comunicados'

}

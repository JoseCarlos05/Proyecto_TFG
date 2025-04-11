import { Component, OnInit } from '@angular/core';
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {ComunicadosComponent} from "./comunicados/comunicados.component";
import {SancionesComponent} from "./sanciones/sanciones.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.scss'],
  standalone: true,
  imports: [
    HeaderComunidadComponent,
    FooterComunidadComponent,
    IonicModule,
    ComunicadosComponent,
    SancionesComponent,
    FormsModule,
    NgIf,
    HeaderComponent
  ]
})
export class DocumentacionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  seccion: string = 'comunicados'

}

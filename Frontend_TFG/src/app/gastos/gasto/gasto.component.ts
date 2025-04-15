import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {HeaderComunidadComponent} from "../../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {FooterComunidadComponent} from "../../footer-comunidad/footer-comunidad.component";

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    FooterComunidadComponent
  ]
})
export class GastoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";

@Component({
    selector: 'app-elecciones',
    templateUrl: './elecciones.component.html',
    styleUrls: ['./elecciones.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    HeaderComunidadComponent,
    FooterComunidadComponent
  ]
})
export class EleccionesComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
}

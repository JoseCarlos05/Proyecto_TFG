import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-propiedades',
    templateUrl: './propiedades.component.html',
    styleUrls: ['./propiedades.component.scss'],
    standalone: true,
    imports: [
        FooterComunidadComponent,
        HeaderComponent,
        HeaderComunidadComponent,
        IonicModule
    ]
})
export class PropiedadesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

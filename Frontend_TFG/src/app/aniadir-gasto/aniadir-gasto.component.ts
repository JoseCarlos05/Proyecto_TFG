import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-aniadir-gasto',
    templateUrl: './aniadir-gasto.component.html',
    styleUrls: ['./aniadir-gasto.component.scss'],
    standalone: true,
    imports: [
        FooterComunidadComponent,
        HeaderComponent,
        HeaderComunidadComponent,
        IonicModule
    ]
})
export class AniadirGastoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

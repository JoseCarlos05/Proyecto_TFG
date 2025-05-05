import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-lanzar-eleccion',
    templateUrl: './lanzar-eleccion.component.html',
    styleUrls: ['./lanzar-eleccion.component.scss'],
    standalone: true,
    imports: [
        FooterComunidadComponent,
        HeaderComponent,
        IonicModule
    ]
})
export class LanzarEleccionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

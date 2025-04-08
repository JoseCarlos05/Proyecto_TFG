import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-footer-comunidad',
    templateUrl: './footer-comunidad.component.html',
    styleUrls: ['./footer-comunidad.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class FooterComunidadComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

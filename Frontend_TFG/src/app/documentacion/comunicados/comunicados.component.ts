import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-comunicados',
    templateUrl: './comunicados.component.html',
    styleUrls: ['./comunicados.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class ComunicadosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

import { Component, OnInit } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-contrato-empleado',
    templateUrl: './contrato-empleado.component.html',
    styleUrls: ['./contrato-empleado.component.scss'],
    standalone: true,
    imports: [
        FooterComponent,
        HeaderComponent,
        IonicModule
    ]
})
export class ContratoEmpleadoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

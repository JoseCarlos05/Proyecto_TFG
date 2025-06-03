import { Component, OnInit } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";

@Component({
    selector: 'app-contrato-empleado',
    templateUrl: './contrato-empleado.component.html',
    styleUrls: ['./contrato-empleado.component.scss'],
    standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    FooterComunidadComponent
  ]
})
export class ContratoEmpleadoComponent2  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

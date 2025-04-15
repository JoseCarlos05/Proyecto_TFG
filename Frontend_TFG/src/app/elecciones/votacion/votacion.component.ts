import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {FooterComponent} from "../../footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {HeaderComunidadComponent} from "../../header-comunidad/header-comunidad.component";
import {FooterComunidadComponent} from "../../footer-comunidad/footer-comunidad.component";

@Component({
    selector: 'app-votacion',
    templateUrl: './votacion.component.html',
    styleUrls: ['./votacion.component.scss'],
    standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    HeaderComunidadComponent,
    FooterComunidadComponent
  ]
})
export class VotacionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

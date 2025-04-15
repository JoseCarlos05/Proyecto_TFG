import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    FooterComunidadComponent
  ]
})
export class GastosComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToGasto() {
    this.router.navigate(['comunidad/gastos/gasto'])
  }
}

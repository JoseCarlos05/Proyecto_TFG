import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {Router} from "@angular/router";
import {Comunidad} from "../modelos/Comunidad";
import {GastosService} from "../servicios/gastos.service";
import {Gasto} from "../modelos/Gasto";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    FooterComunidadComponent,
    NgForOf,
    NgClass
  ]
})
export class GastosComponent  implements OnInit {
  comunidadObjeto!: Comunidad
  listaGastos: Gasto[] = []

  constructor(private router: Router,
              private gastosService: GastosService) { }

  ngOnInit() {
    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
      this.listarGastos()
    }
  }

  listarGastos() {
    if (this.comunidadObjeto?.id)
      this.gastosService.listarGastos(this.comunidadObjeto.id).subscribe({
        next: data => this.listaGastos = data
      })
  }

  comprobarEstado(gasto: Gasto): string {
    if (gasto.total === gasto.cantidadPagada) {
      return "Pagado"
    }
    return "Pendiente"
  }

  navigateToGasto(idGasto: number) {
    this.router.navigate(['comunidad/gastos/gasto', idGasto])
  }
}

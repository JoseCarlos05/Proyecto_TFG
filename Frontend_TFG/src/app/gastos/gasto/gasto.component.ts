import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {HeaderComunidadComponent} from "../../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {FooterComunidadComponent} from "../../footer-comunidad/footer-comunidad.component";
import {ActivatedRoute, Router} from "@angular/router";
import {GastosService} from "../../servicios/gastos.service";
import {Comunidad} from "../../modelos/Comunidad";
import {Gasto} from "../../modelos/Gasto";
import {Vecino} from "../../modelos/Vecino";
import {ViviendaService} from "../../servicios/vivienda.service";

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    FooterComunidadComponent
  ]
})
export class GastoComponent implements OnInit {
  comunidadObjeto!: Comunidad
  gasto: Gasto = {} as Gasto;
  idGasto!: number;
  numeroVivenda: number = 0;
  totalPorVecino: number = 0;
  porcentajePagado: number = 0;
  constructor(private router: Router,
              private gastosService: GastosService,
              private activateRoute: ActivatedRoute,
              private viviendaService: ViviendaService) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.idGasto = Number(params['id']);
    });
    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
      this.numeroViviendas(this.comunidadObjeto.id)
    }
    this.verGasto(this.idGasto)
    this.calcularPorcentajePagado(this.idGasto)
  }

  verGasto(idGasto: number) {
    if (idGasto)
      this.gastosService.verGasto(idGasto).subscribe({
        next: data => {
          this.gasto = data
          this.totalPorVecino = this.gasto.total / this.numeroVivenda
        }
      })
  }

  numeroViviendas(idComunidad: number) {
    if (idComunidad)
      this.viviendaService.numeroViviendas(idComunidad).subscribe({
        next: data => this.numeroVivenda = data
      })
  }

  calcularPorcentajePagado(idGasto: number) {
    if (idGasto)
      this.gastosService.calcularPorcentajePagado(idGasto).subscribe({
        next: data => {
          this.porcentajePagado = data
        }
      })
  }

}

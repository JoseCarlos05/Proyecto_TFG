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
import {loadStripe} from "@stripe/stripe-js";

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
          this.gasto = data;
          sessionStorage.setItem('gastoStorage', JSON.stringify(this.gasto));
          if (this.numeroVivenda > 0) {
            this.totalPorVecino = this.gasto.total / this.numeroVivenda;
          }
        }
      });
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

  stripeClavePublica = 'pk_test_51RIofJQu2AOfAVJhL5JoD26V1FmzcDjuqnKvY2jXakWcYFC3Xvdgy0AvwyW8vZVsHYmjoPyysEuyQDIObfo9jURb006ljK69KO'; // tu clave pública de Stripe

  async iniciarPago() {
    const stripe = await loadStripe(this.stripeClavePublica);
    const idSesion = await this.crearSesionPago();

    if (stripe && idSesion) {
      stripe.redirectToCheckout({ sessionId: idSesion });
    }
  }

  async crearSesionPago(): Promise<string> {
    const respuesta = await fetch('http://localhost:8080/api/pago/crear-sesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        producto: 'Pago de gasto comunidad: '+ this.gasto.concepto,
        monto: Math.round(this.totalPorVecino * 100)
      })
    });

    const datos = await respuesta.json();
    return datos.idSesion;
  }


}

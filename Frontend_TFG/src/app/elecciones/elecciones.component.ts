import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {Comunidad} from "../modelos/Comunidad";
import {EleccionesService} from "../servicios/elecciones.service";
import {Eleccion} from "../modelos/Eleccion";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-elecciones',
    templateUrl: './elecciones.component.html',
    styleUrls: ['./elecciones.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    HeaderComunidadComponent,
    FooterComunidadComponent,
    NgForOf
  ]
})
export class EleccionesComponent  implements OnInit {
  comunidadObjeto?: Comunidad
  listaElecciones: Eleccion[] = []

  constructor(private router: Router,
              private eleccionesService: EleccionesService) { }

  ngOnInit() {
    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
      this.listarElecciones()
    }
  }

  listarElecciones() {
    if (this.comunidadObjeto?.id)
      this.eleccionesService.listarElecciones(this.comunidadObjeto.id).subscribe({
        next: data => this.listaElecciones = data
      })
  }

  navigateToElecciones() {
    this.router.navigate(['comunidad/elecciones/votacion'])
  }

  calcularFecha(eleccion: Eleccion): string {
    if (!eleccion.fecha) {
      return "";
    }

    const fechaActual = new Date();
    const fechaPublicacion = new Date(eleccion.fecha);
    const milisegundos = fechaActual.getTime() - fechaPublicacion.getTime();

    const minutos = 1000 * 60;
    const horas   = minutos * 60;
    const dias    = horas * 24;
    const meses  = dias * 30;
    const anios   = dias * 365;

    if (milisegundos >= anios) {
      const years = Math.floor(milisegundos / anios);
      return `Hace ${years} ${years === 1 ? "año" : "años"}`;
    } else if (milisegundos >= meses) {
      const months = Math.floor(milisegundos / meses);
      return `Hace ${months} ${months === 1 ? "mes" : "meses"}`;
    } else if (milisegundos >= dias) {
      const days = Math.floor(milisegundos / dias);
      return `Hace ${days} ${days === 1 ? "día" : "días"}`;
    } else if (milisegundos >= horas) {
      const hours = Math.floor(milisegundos / horas);
      return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else if (milisegundos >= minutos) {
      const minutes = Math.floor(milisegundos / minutos);
      return `Hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    } else {
      return "Hace un momento";
    }
  }

  calcularAbierta(eleccion: Eleccion): string {
    if (!eleccion.abierta) {
      return "Cerrada";
    }else {
      return "Abierta"
    }

  }
}

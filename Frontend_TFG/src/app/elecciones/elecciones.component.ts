import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {Comunidad} from "../modelos/Comunidad";
import {EleccionesService} from "../servicios/elecciones.service";
import {Eleccion} from "../modelos/Eleccion";
import {NgClass, NgForOf, NgIf} from "@angular/common";

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
    NgForOf,
    NgClass,
    NgIf
  ]
})
export class EleccionesComponent  implements OnInit {
  comunidadObjeto!: Comunidad
  listaElecciones: Eleccion[] = []

  constructor(private router: Router,
              private eleccionesService: EleccionesService) { }

  ngOnInit() {
    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
    }
  }

  ionViewWillEnter() {
    this.listarElecciones()
  }

  listarElecciones() {
    if (this.comunidadObjeto?.id) {
      this.eleccionesService.listarElecciones(this.comunidadObjeto.id).subscribe({
        next: data => {
          this.listaElecciones = data.sort((a, b) => {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
          });
        }
      });
    }
  }

  navigateToVotacion(eleccion: Eleccion) {
    if (!eleccion.abierta) {
      return;
    }
    this.router.navigate(['comunidad/elecciones/votacion', eleccion.id])
  }

  calcularFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);

    const esMismaFecha = (a: Date, b: Date): boolean =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (esMismaFecha(fecha, hoy)) {
      return 'Hoy';
    } else if (esMismaFecha(fecha, ayer)) {
      return 'Ayer';
    } else {
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      const dia = fecha.getDate();
      const mes = meses[fecha.getMonth()];
      const año = fecha.getFullYear();
      return `${dia} de ${mes} de ${año}`;
    }
  }

  comprobarEstado(eleccion: Eleccion): string {
    if (!eleccion.abierta) {
      return "Cerrada";
    }else {
      return "Abierta"
    }
  }
}

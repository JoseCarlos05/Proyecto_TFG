import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Comunidad} from "../../modelos/Comunidad";
import {NavigationEnd, Router} from "@angular/router";
import {ComunicadoService} from "../../servicios/comunicado.service";
import {NgForOf, NgIf} from "@angular/common";
import {Comunicado} from "../../modelos/Comunicado";
import {filter} from "rxjs";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {QuillModule} from "ngx-quill";
import {Vecino} from "../../modelos/Vecino";
import {VecinoService} from "../../servicios/vecino.service";

@Component({
    selector: 'app-comunicados',
    templateUrl: './comunicados.component.html',
    styleUrls: ['./comunicados.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgForOf,
        QuillModule,
        NgIf
    ]
})
export class ComunicadosComponent  implements OnInit {

  listaComunicado: Comunicado[] = []
  correo?: string
  comunidadObjeto?: Comunidad
  vecinosMap: { [id: number]: Vecino } = {};

  constructor(private router: Router,
              private comunicadoService: ComunicadoService,
              private sanitizer: DomSanitizer,
              private vecinoService: VecinoService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/comunidad/documentacion') {
          this.inicio()
        }
      });
  }

  ngOnInit() {
    this.inicio()
  }

  htmlSeguro(descripcion: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(descripcion)
  }

  inicio() {
    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
      this.listarComunicados();
    }
  }

  listarComunicados() {
    if (this.comunidadObjeto?.id) {
      this.comunicadoService.listarComunicados(this.comunidadObjeto.id).subscribe({
        next: data => {
          this.listaComunicado = data.sort((a, b) => {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
          });

          const idsVecinos = [...new Set(this.listaComunicado.map(c => c.idVecino))];

          idsVecinos.forEach(idVecino => {
            if (idVecino) {
              this.vecinoService.cargarVecinoPorIdVecino(idVecino).subscribe({
                next: vecino => {
                  this.vecinosMap[idVecino] = vecino;
                },
                error: err => {
                  console.error(`Error al cargar vecino ${idVecino}:`, err);
                }
              });
            }
          });
        },
        error: err => {
          console.error('Error al listar comunicados:', err);
        }
      });
    }
  }

  formatearFecha(fechaISO: string): string {
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

  navigateToCrearComunicado(){
    this.router.navigate(['crear-comunicado']);

  }
}

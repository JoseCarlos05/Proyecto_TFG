import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {QuillModule} from "ngx-quill";
import {NavigationEnd, Router} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Comunicado} from "../../modelos/Comunicado";
import {Comunidad} from "../../modelos/Comunidad";
import {ComunicadoService} from "../../servicios/comunicado.service";
import {filter} from "rxjs";

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

  constructor(private router: Router,
              private comunicadoService: ComunicadoService,
              private sanitizer: DomSanitizer) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/comunidad/documentacion-comunidad') {
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
    sessionStorage.setItem('comunidad', JSON.stringify({ id: 1, nombre: 'Comunidad jmateos' }))
    const comunidad = sessionStorage.getItem('comunidad');
    console.log('Comunidad en sessionStorage:', comunidad);
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
      this.listarComunicados();
    } else {
      console.error('No se encontró el objeto comunidad en sessionStorage');
    }
  }


  listarComunicados() {
    if (this.comunidadObjeto?.id)
      this.comunicadoService.listarComunicados(this.comunidadObjeto.id).subscribe({
        next: data => this.listaComunicado = data.sort((a, b) => {
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        })
      })
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
    this.router.navigate(['crear-comunicado-comunidad']);
  }
}

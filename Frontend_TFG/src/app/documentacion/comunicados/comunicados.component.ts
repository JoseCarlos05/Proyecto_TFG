import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Comunidad} from "../../modelos/Comunidad";
import {NavigationEnd, Router} from "@angular/router";
import {ComunicadoService} from "../../servicios/comunicado.service";
import {NgForOf} from "@angular/common";
import {Comunicado} from "../../modelos/Comunicado";
import {filter} from "rxjs";

@Component({
    selector: 'app-comunicados',
    templateUrl: './comunicados.component.html',
    styleUrls: ['./comunicados.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    NgForOf
  ]
})
export class ComunicadosComponent  implements OnInit {

  listaComunicado: Comunicado[] = []
  correo?: string
  comunidadObjeto?: Comunidad

  constructor(private router: Router,
              private comunicadoService: ComunicadoService) {
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

  inicio() {
    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
      this.listarComunicados();
    }
  }

  listarComunicados() {
    if (this.comunidadObjeto?.id)
      this.comunicadoService.listarComunicados(this.comunidadObjeto.id).subscribe({
        next: data => this.listaComunicado = data
      })
  }

  navigateToCrearComunicado(){
    this.router.navigate(['crear-comunicado']);

  }

}

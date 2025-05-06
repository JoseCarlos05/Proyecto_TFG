import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu-inferior-comunidad',
    templateUrl: './menu-inferior-comunidad.component.html',
    styleUrls: ['./menu-inferior-comunidad.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class MenuInferiorComunidadComponent  implements OnInit {

  propiedadesImgSrc: string = 'assets/icon/footer-comunidad/propiedades.png'
  gastosImgSrc: string = 'assets/icon/footer-comunidad/gastos.png'
  viviendaImgSrc: string = 'assets/icon/footer/casaActive.png'
  eleccionesImgSrc: string = 'assets/icon/footer-comunidad/elecciones.png'
  documentacionImgSrc: string = 'assets/icon/footer-comunidad/documentacion.png'

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url.includes('/propiedades-comunidades')) {
      this.propiedadesImgSrc = 'assets/icon/footer-comunidad/propiedadesActive.png'
    } else if (this.router.url.includes('/gastos/comunidad')) {
      this.gastosImgSrc = 'assets/icon/footer-comunidad/gastosActive.png'
    } else if (this.router.url.includes('/lista-viviendas')) {
      this.viviendaImgSrc = 'assets/icon/footer/casa.png'
    } else if (this.router.url.includes('/eleccion/comunidad')) {
      this.eleccionesImgSrc = 'assets/icon/footer-comunidad/eleccionesActive.png'
    } else if (this.router.url.includes('/documentacion')) {
      this.documentacionImgSrc = 'assets/icon/footer-comunidad/documentacionActive.png'
    }
  }

  navigateToPropiedades() {
    this.router.navigate(['propiedades-comunidades'])

  }

  navigateToGastos() {
    this.router.navigate(['gastos/comunidad'])
  }

  navigateToVivienda() {
    this.router.navigate(['lista-viviendas'])
  }

  navigateToElecciones() {
    this.router.navigate(['eleccion/comunidad']);
  }

  navigateToDocumentacion() {
    this.router.navigate(['comunidad/documentacion'])
  }

}

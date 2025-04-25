import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {Comunidad} from "../modelos/Comunidad";

@Component({
    selector: 'app-footer-comunidad',
    templateUrl: './footer-comunidad.component.html',
    styleUrls: ['./footer-comunidad.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class FooterComunidadComponent  implements OnInit {

  propiedadesImgSrc: string = 'assets/icon/footer-comunidad/propiedades.png'
  gastosImgSrc: string = 'assets/icon/footer-comunidad/gastos.png'
  perfilImgSrc: string = 'assets/icon/footer-comunidad/perfil.png'
  eleccionesImgSrc: string = 'assets/icon/footer-comunidad/elecciones.png'
  documentacionImgSrc: string = 'assets/icon/footer-comunidad/documentacion.png'

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url.includes('/propiedades')) {
      this.propiedadesImgSrc = 'assets/icon/footer-comunidad/propiedadesActive.png'
    } else if (this.router.url.includes('/gastos')) {
      this.gastosImgSrc = 'assets/icon/footer-comunidad/gastosActive.png'
    } else if (this.router.url.includes('/perfil')) {
      this.perfilImgSrc = 'assets/icon/footer-comunidad/perfilActive.png'
    } else if (this.router.url.includes('/elecciones')) {
      this.eleccionesImgSrc = 'assets/icon/footer-comunidad/eleccionesActive.png'
    } else if (this.router.url.includes('/documentacion')) {
      this.documentacionImgSrc = 'assets/icon/footer-comunidad/documentacionActive.png'
    }
  }

  navigateToPropiedades() {

  }

  navigateToGastos() {
    this.router.navigate(['comunidad/gastos'])
  }

  navigateToPerfil() {
    this.router.navigate(['comunidad/perfil'])
  }

  navigateToElecciones() {
    this.router.navigate(['/comunidad/elecciones']);
  }

  navigateToDocumentacion() {
    this.router.navigate(['comunidad/documentacion'])
  }
}

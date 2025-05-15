import { Component, OnInit } from '@angular/core';
import { FooterComunidadComponent } from "../footer-comunidad/footer-comunidad.component";
import { HeaderComponent } from "../header/header.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poner-sanciones',
  templateUrl: './poner-sanciones.component.html',
  styleUrls: ['./poner-sanciones.component.scss'],
  standalone: true,
  imports: [
    FooterComunidadComponent,
    HeaderComponent,
    IonicModule,
    FormsModule
  ]
})
export class PonerSancionesComponent implements OnInit {

  sancionTexto: string = '';
  mostrarToast: boolean = false;
  mensajeToast: string = '';
  colorToast: 'success' | 'danger' | 'warning' = 'success';

  constructor() {}

  ngOnInit() {}

  sancionar() {
    if (!this.sancionTexto.trim()) {
      this.mensajeToast = 'Debes escribir una sanción.';
      this.colorToast = 'danger';
      this.mostrarToast = true;
      return;
    }

    this.mensajeToast = 'Sanción añadida correctamente.';
    this.colorToast = 'success';
    this.mostrarToast = true;
    this.sancionTexto = '';
  }
}

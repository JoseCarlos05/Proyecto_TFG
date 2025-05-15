import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { IonicModule } from "@ionic/angular";
import { FooterComunidadComponent } from "../footer-comunidad/footer-comunidad.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poner-comunicados',
  templateUrl: './poner-comunicados.component.html',
  styleUrls: ['./poner-comunicados.component.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    IonicModule,
    FooterComunidadComponent,
    FormsModule
  ]
})
export class PonerComunicadosComponent implements OnInit {

  textoComunicado: string = '';
  mostrarToast: boolean = false;
  mensajeToast: string = '';
  colorToast: 'success' | 'danger' = 'success';

  constructor() {}

  ngOnInit() {}

  comunicar() {
    if (!this.textoComunicado.trim()) {
      this.mensajeToast = 'Debes introducir un comunicado.';
      this.colorToast = 'danger';
      this.mostrarToast = true;
      return;
    }

    this.mensajeToast = 'Comunicado enviado correctamente.';
    this.colorToast = 'success';
    this.mostrarToast = true;
    this.textoComunicado = '';
  }
}

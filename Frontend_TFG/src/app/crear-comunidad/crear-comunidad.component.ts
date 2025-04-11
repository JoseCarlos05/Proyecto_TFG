import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-crear-comunidad',
    templateUrl: './crear-comunidad.component.html',
    styleUrls: ['./crear-comunidad.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class CrearComunidadComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToCrearComunidad2() {
    this.router.navigate(['/crear-comunidad-2']);
  }
}

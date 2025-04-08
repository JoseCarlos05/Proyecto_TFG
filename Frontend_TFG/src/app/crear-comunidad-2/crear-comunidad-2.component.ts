import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-crear-comunidad-2',
    templateUrl: './crear-comunidad-2.component.html',
    styleUrls: ['./crear-comunidad-2.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class CrearComunidad2Component  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToComunidades() {
    this.router.navigate(['/comunidades']);
  }
}

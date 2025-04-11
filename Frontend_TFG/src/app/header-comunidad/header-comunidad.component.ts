import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header-comunidad',
    templateUrl: './header-comunidad.component.html',
    styleUrls: ['./header-comunidad.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class HeaderComunidadComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToComunidades() {
    this.router.navigate(['/comunidades']);
  }
}

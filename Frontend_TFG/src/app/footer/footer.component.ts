import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class FooterComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }

  navigateToComunidades() {
    this.router.navigate(['/comunidades']);
  }

  navigateToCrearComunidad() {
    this.router.navigate(['/crear-comunidad']);
  }

  navigateToUnirseComunidad() {}
}

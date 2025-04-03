import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-config-perfil-vecino',
    templateUrl: './config-perfil-vecino.html',
    styleUrls: ['./config-perfil-vecino.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class ConfigPerfilVecino implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }
}

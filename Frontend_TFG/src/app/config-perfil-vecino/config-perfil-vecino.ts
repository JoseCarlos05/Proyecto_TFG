import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

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

  constructor() { }

  ngOnInit() {}

  protected readonly Date = Date;
}

import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-inicio-sesion',
    templateUrl: './inicio-sesion.component.html',
    styleUrls: ['./inicio-sesion.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true,
})
export class InicioSesionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-sanciones',
  templateUrl: './sanciones.component.html',
  styleUrls: ['./sanciones.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class SancionesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

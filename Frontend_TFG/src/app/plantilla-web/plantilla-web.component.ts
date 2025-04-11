import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-plantilla-web',
  templateUrl: './plantilla-web.component.html',
  styleUrls: ['./plantilla-web.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PlantillaWebComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

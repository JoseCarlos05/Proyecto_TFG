import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-registrodos',
    templateUrl: './registrodos.component.html',
    styleUrls: ['./registrodos.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class RegistrodosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  protected readonly Date = Date;
}

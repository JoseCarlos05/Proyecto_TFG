import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class ChatComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

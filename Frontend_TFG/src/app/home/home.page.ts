import {Component, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonGrid,
  IonCol,
  IonImg,
  IonButton
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonRow, IonGrid, IonCol, IonImg, IonButton],
  standalone: true
})
export class HomePage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  accionBoton() {
    this.router.navigate(['/inicio-sesion']);
  }
}

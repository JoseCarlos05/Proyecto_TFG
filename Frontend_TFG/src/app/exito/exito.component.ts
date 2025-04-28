import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ExitoComponent {
  constructor(private router: Router) {}

  volverHome() {
    this.router.navigate(['comunidad/gastos']);
  }
}

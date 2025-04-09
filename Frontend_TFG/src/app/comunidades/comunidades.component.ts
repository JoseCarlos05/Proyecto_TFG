import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.scss'],
  imports: [IonicModule, CommonModule, FooterComponent, HeaderComponent],
  standalone: true,
})
export class ComunidadesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToComunidad() {
    this.router.navigate(['/comunidad/elecciones']);
  }
}

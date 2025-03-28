import { Routes } from '@angular/router';
import {IniciosesionComponent} from "./iniciosesion/iniciosesion.component";
import {RegistroComponent} from "./registro/registro.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'iniciosesion',
    loadComponent: () => import('./iniciosesion/iniciosesion.component').then((m) => m.IniciosesionComponent),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.component').then((m) => m.RegistroComponent),
  },
];

import { Routes } from '@angular/router';
import {IniciosesionComponent} from "./iniciosesion/iniciosesion.component";
import {RegistroComponent} from "./registro/registro.component";
import {RegistrodosComponent} from "./registrodos/registrodos.component";

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
  {
    path: 'registrodos',
    loadComponent: () => import('./registrodos/registrodos.component').then((m) => m.RegistrodosComponent),
  },
];

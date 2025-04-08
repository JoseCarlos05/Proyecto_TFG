import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full',
  },
  {
    path: 'inicio-sesion',
    loadComponent: () => import('./inicio-sesion/inicio-sesion.component').then((m) => m.InicioSesionComponent),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.component').then((m) => m.RegistroComponent),
  },
  {
    path: 'config-perfil-vecino',
    loadComponent: () => import('./config-perfil-vecino/config-perfil-vecino.component').then((m) => m.ConfigPerfilVecinoComponent),
  },
  {
    path: 'comunidades',
    loadComponent: () => import('./comunidades/comunidades.component').then((m) => m.ComunidadesComponent),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
    path: 'elecciones',
    loadComponent: () => import('./elecciones/elecciones.component').then((m) => m.EleccionesComponent),
  },
];

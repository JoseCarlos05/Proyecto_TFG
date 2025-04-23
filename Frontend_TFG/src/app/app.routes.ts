import { Routes } from '@angular/router';
import {NotificacionesComponent} from "./notificaciones/notificaciones.component";
import {ContratoEmpleadoComponent} from "./contrato-empleado/contrato-empleado.component";

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
    loadComponent: () => import('./registro-vecino/registro/registro.component').then((m) => m.RegistroComponent),
  },
  {
    path: 'config-perfil-vecino',
    loadComponent: () => import('./registro-vecino/config-perfil-vecino/config-perfil-vecino.component').then((m) => m.ConfigPerfilVecinoComponent),
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
    path: 'comunidad/:id/elecciones',
    loadComponent: () => import('./elecciones/elecciones.component').then((m) => m.EleccionesComponent),
  },
  {
    path: 'comunidad/elecciones/votacion',
    loadComponent: () => import('./elecciones/votacion/votacion.component').then((m) => m.VotacionComponent),
  },
  {
    path: 'comunidad/documentacion',
    loadComponent: () => import('./documentacion/documentacion.component').then((m) => m.DocumentacionComponent),
  },
  {
    path: 'crear-comunidad',
    loadComponent: () => import('./registro-comunidad/crear-comunidad/crear-comunidad.component').then((m) => m.CrearComunidadComponent),
  },
  {
    path: 'crear-comunidad-2',
    loadComponent: () => import('./registro-comunidad/crear-comunidad-2/crear-comunidad-2.component').then((m) => m.CrearComunidad2Component),
  },
  {
    path: 'comunidad/perfil',
    loadComponent: () => import('./perfil-comunidad/perfil-comunidad.component').then((m) => m.PerfilComunidadComponent),
  },
  {
    path: 'comunidad/gastos',
    loadComponent: () => import('./gastos/gastos.component').then((m) => m.GastosComponent),
  },
  {
    path: 'comunidad/gastos/gasto',
    loadComponent: () => import('./gastos/gasto/gasto.component').then((m) => m.GastoComponent),
  },
  {
    path: 'plantilla-web',
    loadComponent: () => import('./plantilla-web/plantilla-web.component').then((m) => m.PlantillaWebComponent),
  },
  {
    path: 'unirse-comunidad',
    loadComponent: () => import('./unirse-comunidad/unirse-comunidad.component').then((m) => m.UnirseComunidadComponent),
  },
  {
    path: 'notificaciones',
    loadComponent: () => import('./notificaciones/notificaciones.component').then((m) => m.NotificacionesComponent),
  },
  {
    path: 'propiedades',
    loadComponent: () => import('./propiedades/propiedades.component').then((m) => m.PropiedadesComponent),
  },
  {
    path: 'propiedades-comunidades',
    loadComponent: () => import('./propiedades-comunidades/propiedades-comunidades.component').then((m) => m.PropiedadesComunidadesComponent),
  },
  {
    path: 'contrato-empleado',
    loadComponent: () => import('./contrato-empleado/contrato-empleado.component').then((m) => m.ContratoEmpleadoComponent),
  },
];

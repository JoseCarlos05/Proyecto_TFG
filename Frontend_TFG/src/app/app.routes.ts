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
    path: 'comunidad/elecciones',
    loadComponent: () => import('./elecciones/elecciones.component').then((m) => m.EleccionesComponent),
  },
  {
    path: 'comunidad/elecciones/votacion/:id',
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
    path: 'comunidad/perfil',
    loadComponent: () => import('./perfil-comunidad/perfil-comunidad.component').then((m) => m.PerfilComunidadComponent),
  },
  {
    path: 'comunidad/gastos',
    loadComponent: () => import('./gastos/gastos.component').then((m) => m.GastosComponent),
  },
  {
    path: 'comunidad/gastos/gasto/:id',
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
    path: 'crear-comunicado',
    loadComponent: () => import('./crear-comunicado/crear-comunicado.component').then((m) => m.CrearComunicadoComponent),
  },
  {
    path: 'exito',
    loadComponent: () => import('./exito/exito.component').then(m => m.ExitoComponent),
  },
  {
    path: 'cancelado',
    loadComponent: () => import('./cancelado/cancelado.component').then(m => m.CanceladoComponent),
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
    path: 'contrato-empleado2',
    loadComponent: () => import('./contrato-empleado2/contrato-empleado.component').then((m) => m.ContratoEmpleadoComponent2),
  },
  {
    path: 'poner-comunicados',
    loadComponent: () => import('./poner-comunicados/poner-comunicados.component').then((m) => m.PonerComunicadosComponent),
  },
  {
    path: 'poner-sanciones',
    loadComponent: () => import('./poner-sanciones/poner-sanciones.component').then((m) => m.PonerSancionesComponent),
  },
  {
    path: 'contrato-empleado',
    loadComponent: () => import('./contrato-empleado/contrato-empleado.component').then((m) => m.ContratoEmpleadoComponent),
  },
  {
    path: 'gastos/comunidad',
    loadComponent: () => import('./gastos-comunidad/gastos-comunidad.component').then((m) => m.GastosComunidadComponent),
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'eleccion/comunidad',
    loadComponent: () => import('./elecciones-comunidad/elecciones-comunidad.component').then((m) => m.EleccionesComunidadComponent),
  },
  {
    path: 'lista-viviendas',
    loadComponent: () => import('./lista-viviendas/lista-viviendas.component').then((m) => m.ListaViviendasComponent),
  },
  {
    path: 'info-vivienda/:id',
    loadComponent: () => import('./info-vivienda/info-vivienda.component').then((m) => m.InfoViviendaComponent)
  },
  {
    path: 'documentacion/comunidad',
    loadComponent: () => import('./documentacion-comunidad/documentacion-comunidad.component').then((m) => m.DocumentacionComunidadComponent)
  },
  {
    path: 'crear/vivienda',
    loadComponent: () => import('./crear-vivienda/crear-vivienda.component').then((m) => m.CrearViviendaComponent)
  }
];

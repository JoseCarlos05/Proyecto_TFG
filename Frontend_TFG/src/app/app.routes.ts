import { Routes } from '@angular/router';

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
    path: 'crear-comunicado-comunidad',
    loadComponent: () => import('./crear-comunicado-comunidad/crear-comunicado-comunidad.component').then((m) => m.CrearComunicadoComunidadComponent),
  },
  {
    path: 'crear-sancion-comunidad',
    loadComponent: () => import('./crear-sancion-comunidad/crear-sancion-comunidad.component').then((m) => m.CrearSancionComunidadComponent),
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
    path: 'notificaciones-comunidad',
    loadComponent: () => import('./notificaciones-comunidad/notificaciones-comunidad.component').then((m) => m.NotificacionesComunidadComponent),
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
    path: 'contrato-empleado',
    loadComponent: () => import('./contrato-empleado/contrato-empleado.component').then((m) => m.ContratoEmpleadoComponent),
  },
  {
    path: 'gastos/comunidad',
    loadComponent: () => import('./gastos-comunidad/gastos-comunidad.component').then((m) => m.GastosComunidadComponent),
  },
  {
    path: 'chat/:id',
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
  },
  {
    path: 'ver-votos/:id',
    loadComponent: () => import('./ver-votos/ver-votos.component').then((m) => m.VerVotosComponent)
  },
  {
    path: 'lista-vecinos',
    loadComponent: () => import('./lista-vecinos/lista-vecinos.component').then((m) => m.ListaVecinosComponent)
  },
  {
    path: 'info-gasto/:id',
    loadComponent: () => import('./info-gasto/info-gasto.component').then((m) => m.InfoGastoComponent)
  },
  {
    path: 'olvidar-contrasena',
    loadComponent: () => import('./olvidar-contrasena/olvidar-contrasena.component').then((m) => m.OlvidarContrasenaComponent)
  },
  {
    path: 'info-garaje',
    loadComponent: () => import('./info-garaje/info-garaje.component').then((m) => m.InfoGarajeComponent)
  },
  {
    path: 'ver-garaje',
    loadComponent: () => import('./garaje-vecino/garaje-vecino.component').then((m) => m.GarajeVecinoComponent)
  },
  {
    path: 'ver-pistas',
    loadComponent: () => import('./ver-pistas/ver-pistas.component').then((m) => m.VerPistasComponent)
  },
  {
    path: 'info-pista-comunidad/:id',
    loadComponent: () => import('./info-pista-comunidad/info-pista-comunidad.component').then((m) => m.InfoPistaComunidadComponent)
  },
  {
    path: 'ver-pistas-vecino',
    loadComponent: () => import('./ver-pistas-vecino/ver-pistas-vecino.component').then((m) => m.VerPistasVecinoComponent)
  },
  {
    path: 'info-pista/:id',
    loadComponent: () => import('./info-pista/info-pista.component').then((m) => m.InfoPistaComponent)
  },
  {
    path: 'ver-reservas-vecino',
    loadComponent: () => import('./ver-reservas-vecino/ver-reservas-vecino.component').then((m) => m.VerReservasVecinoComponent)
  },
  {
    path: 'info-piscina',
    loadComponent: () => import('./info-piscina/info-piscina.component').then((m) => m.InfoPiscinaComponent)
  },
  {
    path: 'club-social-comunidad',
    loadComponent: () => import('./club-social-comunidad/club-social-comunidad.component').then((m) => m.ClubSocialComunidadComponent)
  },
  {
    path: 'club-social',
    loadComponent: () => import('./club-social/club-social.component').then((m) => m.ClubSocialComponent)
  }
];

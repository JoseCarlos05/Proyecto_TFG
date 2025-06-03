export interface Notificacion {
  id?: number;
  fecha: string;
  tipo: TipoNotificacion;
  idsVecinos: number[];
  idComunidad: number;
}

export enum TipoNotificacion {
  COMUNICADO = 'COMUNICADO',
  DEUDA = 'DEUDA',
  RESERVA = 'RESERVA',
  SANCION = 'SANCION',
  BIENVENIDA = 'BIENVENIDA',
  ELECCION= "ELECCION"
}

export interface HorarioCompleto {
  id: number;
  horaInicio: string;
  horaFin: string;
  dia: string;
  reservado: boolean;
  idPista?: number;
  idVecino?: number;

}

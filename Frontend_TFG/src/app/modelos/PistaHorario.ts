import {HorarioCompleto} from "./HorarioCompleto";

export interface PistaHorario {
  id: number;
  deporte: string;
  idComunidad: number;
  horarios: HorarioCompleto[];
}

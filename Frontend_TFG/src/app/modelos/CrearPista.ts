import {Horario} from "./Horario";

export interface CrearPista {
  deporte: string;
  horarios: Horario[];
  idComunidad?: number;
  diasRepetir?: number;
}

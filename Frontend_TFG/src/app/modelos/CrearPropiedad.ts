import {TipoPropiedad} from "../enum/TipoPropiedad";

export interface CrearPropiedad {
  nombre: string;
  tipo?: TipoPropiedad;
  idComunidad?: number;
}

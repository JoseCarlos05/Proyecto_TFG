import {TipoPropiedad} from "../enum/TipoPropiedad";

export interface Propiedad {
  id: number
  nombre: string
  direccion?: number
  tipoPropiedad: TipoPropiedad
  idComunidad: number
  idPista?: number
}

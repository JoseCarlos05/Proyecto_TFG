import {Vecino} from "./Vecino";
import {Gasto} from "./Gasto";

export interface VecinoDeuda {
  vecino: Vecino;
  gastos: Gasto[];
}

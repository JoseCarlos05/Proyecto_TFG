import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Observable} from "rxjs";
import {Gasto} from "../modelos/Gasto";
import {MarcarPagado} from "../modelos/MarcarPagado";
import {CrearGasto} from "../modelos/CrearGasto";
import {VecinoGastos} from "../modelos/VecinoGastos";
import {Vecino} from "../modelos/Vecino";

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  listarGastos(idComunidad: number): Observable<Gasto[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Gasto[]>(`${this.apiUrl}/vecino/listar/gastos/${idComunidad}`, options)
  }

  listarGastosComunidad(idComunidad: number): Observable<Gasto[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Gasto[]>(`${this.apiUrl}/comunidad/listar/gastos/${idComunidad}`, options)
  }

  verGasto(idGasto: number): Observable<Gasto> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Gasto>(`${this.apiUrl}/vecino/ver/gasto/${idGasto}`, options)
  }

  calcularPorcentajePagado(idGasto: number): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl}/calcular/porcentaje/${idGasto}`, options)
  }

  marcarPagado(marcarPagado: MarcarPagado): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/marcar/pagado`, marcarPagado, options);
  }

  crearGasto(crearGasto: CrearGasto): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/comunidad/crear/gasto`, crearGasto, options);
  }

  listarDeudoresIdComunidad(idComunidad: number): Observable<VecinoGastos[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<VecinoGastos[]>(`${this.apiUrl}/comunidad/listar/deudores/comunidad/${idComunidad}`, options)
  }

  listarDeudoresIdComunidadVecino(idComunidad: number): Observable<VecinoGastos[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<VecinoGastos[]>(`${this.apiUrl}/vecino/listar/deudores/comunidad/${idComunidad}`, options)
  }

  verGastoComunidad(idGasto: number): Observable<Gasto> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Gasto>(`${this.apiUrl}/comunidad/ver/gasto/${idGasto}`, options)
  }

  listarDeudoresIdGasto(idGasto: number): Observable<Vecino[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vecino[]>(`${this.apiUrl}/comunidad/listar/deudores/${idGasto}`, options)
  }
}

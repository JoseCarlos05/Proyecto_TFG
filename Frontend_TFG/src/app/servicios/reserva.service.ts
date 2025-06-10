import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Observable} from "rxjs";
import {Gasto} from "../modelos/Gasto";
import {Reserva} from "../modelos/Reserva";
import {CrearGasto} from "../modelos/CrearGasto";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  listarReserva(idVecino: number, idComunidad: number): Observable<Reserva[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Reserva[]>(`${this.apiUrl}/vecino/listar/reserva/club/${idVecino}/${idComunidad}`, options)
  }

  reservarClub(reservar: Reserva): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/vecino/reservar/club`, reservar, options);
  }

  listarReservaComunidad(idComunidad: number): Observable<Reserva[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Reserva[]>(`${this.apiUrl}/comunidad/listar/reserva/club/${idComunidad}`, options)
  }
}

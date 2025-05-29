import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Observable} from "rxjs";
import {Gasto} from "../modelos/Gasto";
import {Pista} from "../modelos/Pista";
import {CrearGasto} from "../modelos/CrearGasto";
import {CrearPista} from "../modelos/CrearPista";
import {HorarioCompleto} from "../modelos/HorarioCompleto";

@Injectable({
  providedIn: 'root'
})
export class PistaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  listarPistas(idComunidad: number): Observable<Pista[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Pista[]>(`${this.apiUrl}/comunidad/listar/pistas/${idComunidad}`, options)
  }

  crearPista(crearPista: CrearPista): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/comunidad/crear/pista`, crearPista, options);
  }

  obtenerHorarios(idPista: number, fecha: string): Observable<HorarioCompleto[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<HorarioCompleto[]>(`${this.apiUrl}/comunidad/pista/reservado?idPista=${idPista}&fecha=${fecha}`,options)
  }

  verPista(idPista: number): Observable<Pista> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Pista>(`${this.apiUrl}comunidad/ver/pista/${idPista}`, options)
  }

  listarPistasVecino(idComunidad: number): Observable<Pista[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Pista[]>(`${this.apiUrl}/vecino/listar/pistas/${idComunidad}`, options)
  }

  obtenerHorariosVecino(idPista: number, fecha: string): Observable<HorarioCompleto[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<HorarioCompleto[]>(`${this.apiUrl}/vecino/pista/reservado?idPista=${idPista}&fecha=${fecha}`,options)
  }

  verPistaVecino(idPista: number): Observable<Pista> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Pista>(`${this.apiUrl}/vecino/ver/pista/${idPista}`, options)
  }

  reservarPista(idHorario: number, idVecino: number): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/vecino/reserva/pista/${idHorario}/${idVecino}`, {} ,options);
  }

}

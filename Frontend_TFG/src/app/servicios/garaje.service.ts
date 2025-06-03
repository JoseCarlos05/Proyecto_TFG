import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Observable} from "rxjs";
import {Gasto} from "../modelos/Gasto";
import {Garaje} from "../modelos/Garaje";
import {CrearEleccion} from "../modelos/CrearEleccion";
import {AnadirViviendaGaraje} from "../modelos/AnadirViviendaGaraje";

@Injectable({
  providedIn: 'root'
})
export class GarajeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  listarGarajes(idComunidad: number): Observable<Garaje[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Garaje[]>(`${this.apiUrl}/comunidad/listar/garaje/${idComunidad}`, options)
  }

  listarGarajesVecino(idComunidad: number): Observable<Garaje[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Garaje[]>(`${this.apiUrl}/vecino/listar/garaje/${idComunidad}`, options)
  }

  anadirViviendaGaraje(anadirViviendaGaraje: AnadirViviendaGaraje): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.put(`${this.apiUrl}/vecino/anadir/vivienda/garaje`, anadirViviendaGaraje, options);
  }
}

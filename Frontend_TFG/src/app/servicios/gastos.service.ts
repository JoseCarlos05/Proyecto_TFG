import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Eleccion} from "../modelos/Eleccion";
import {Observable} from "rxjs";
import {Gasto} from "../modelos/Gasto";

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
}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vecino} from "../modelos/Vecino";

@Injectable({
  providedIn: 'root'
})
export class VecinoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  cargarVecinoPorIdUsuario(idUsuario: number): Observable<Vecino> {
    return this.http.get<Vecino>(`${this.apiUrl}/vecino/ver/vecino/usuario/${idUsuario}`)
  }
}

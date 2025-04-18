import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comunidad} from "../modelos/Comunidad";

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listarComunidades(idVecino: number): Observable<Comunidad[]> {
    return this.http.get<Comunidad[]>(`${this.apiUrl}/vecino/listar/comunidades/${idVecino}`)
  }
}

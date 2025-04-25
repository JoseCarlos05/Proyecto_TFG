import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Observable} from "rxjs";
import {Comunidad} from "../modelos/Comunidad";
import {Vivienda} from "../modelos/Vivienda";
import {Vecino} from "../modelos/Vecino";

@Injectable({
  providedIn: 'root'
})
export class ViviendaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  listarViviendas(idComunidad: number | undefined): Observable<Vivienda[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vivienda[]>(`${this.apiUrl}/vecino/listar/viviendas/${idComunidad}`, options)
  }

  listarResidentes(idVivienda: number): Observable<Vecino[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vecino[]>(`${this.apiUrl}/vecino/listar/residentes/${idVivienda}`, options)
  }

}

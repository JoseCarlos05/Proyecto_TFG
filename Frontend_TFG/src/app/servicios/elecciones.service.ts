import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Comunidad} from "../modelos/Comunidad";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Eleccion} from "../modelos/Eleccion";

@Injectable({
  providedIn: 'root'
})
export class EleccionesService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  listarElecciones(idComunidad: number): Observable<Eleccion[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Eleccion[]>(`${this.apiUrl}/vecino/listar/elecciones/${idComunidad}`, options)
  }

  getEleccion(idEleccion: number): Observable<Eleccion> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Eleccion>(`${this.apiUrl}/vecino/ver/eleccion/${idEleccion}`, options)
  }

  totalVoto(idEleccion: number): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl}/vecino/ver/total/voto/${idEleccion}`, options)
  }
}

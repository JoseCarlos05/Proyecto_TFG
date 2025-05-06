import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Comunidad} from "../modelos/Comunidad";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Eleccion} from "../modelos/Eleccion";
import {InsertarCodigo} from "../modelos/InsertarCodigo";
import {CrearEleccion} from "../modelos/CrearEleccion";

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

  crearEleccion(crearEleccion: CrearEleccion): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/comunidad/crear/eleccion`, crearEleccion, options);
  }

  listarEleccionesComunidad(idComunidad: number): Observable<Eleccion[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Eleccion[]>(`${this.apiUrl}/comunidad/listar/elecciones/${idComunidad}`, options)
  }
}

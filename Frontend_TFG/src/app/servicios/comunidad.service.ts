import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comunidad} from "../modelos/Comunidad";
import {ComunService} from "./comun.service";
import {InsertarCodigo} from "../modelos/InsertarCodigo";

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  listarComunidades(idVecino: number): Observable<Comunidad[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Comunidad[]>(`${this.apiUrl}/vecino/listar/comunidades/${idVecino}`, options)
  }

  insertarCodigo(insertarCodigo: InsertarCodigo): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/vecino/insertar/codigo`, insertarCodigo, options);
  }

  solicitadUnion(idVivienda: number, idComunidad: number, idVecino: number): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/vecino/solicitar/${idVivienda}/${idComunidad}/${idVecino}`, {},options);
  }

  listarTodasComunidades(): Observable<Comunidad[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Comunidad[]>(`${this.apiUrl}/vecino/listar/todas/comunidades`, options)
  }
}

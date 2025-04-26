import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Observable} from "rxjs";
import {Comunidad} from "../modelos/Comunidad";
import {Sancion} from "../modelos/Sancion";

@Injectable({
  providedIn: 'root'
})
export class SancionService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  listarSanciones(idComunidad: number): Observable<Sancion[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Sancion[]>(`${this.apiUrl}/vecino/listar/sanciones/${idComunidad}`, options)
  }

}

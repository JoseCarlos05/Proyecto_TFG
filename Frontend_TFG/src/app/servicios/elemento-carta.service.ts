import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Observable} from "rxjs";
import {Eleccion} from "../modelos/Eleccion";
import {ElementoCarta} from "../modelos/ElementoCarta";
import {CrearEleccion} from "../modelos/CrearEleccion";
import {AnadirElemento} from "../modelos/AnadirElemento";
import {Carta} from "../modelos/Carta";

@Injectable({
  providedIn: 'root'
})
export class ElementoCartaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  listarElementos(idCarta: number): Observable<ElementoCarta[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<ElementoCarta[]>(`${this.apiUrl}/comunidad/listar/carta/${idCarta}`, options)
  }

  crearElemento(crearElemento: AnadirElemento): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/comunidad/anadir/elemento`, crearElemento, options);
  }

  verCartaComunidad(idComunidad: number): Observable<Carta> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Carta>(`${this.apiUrl}/comunidad/ver/carta/${idComunidad}`, options)
  }

  listarElementosVecino(idCarta: number): Observable<ElementoCarta[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<ElementoCarta[]>(`${this.apiUrl}/vecino/listar/carta/${idCarta}`, options)
  }

  verCartaComunidadVecino(idComunidad: number): Observable<Carta> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Carta>(`${this.apiUrl}/vecino/ver/carta/${idComunidad}`, options)
  }
}

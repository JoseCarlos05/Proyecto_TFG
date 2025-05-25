import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {InsertarCodigo} from "../modelos/InsertarCodigo";
import {Observable} from "rxjs";
import {CrearPropiedad} from "../modelos/CrearPropiedad";
import {Gasto} from "../modelos/Gasto";
import {TipoPropiedad} from "../enum/TipoPropiedad";
import {Propiedad} from "../modelos/Propiedad";

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  crearPropiedad(crearPropiedad: CrearPropiedad): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/comunidad/crear/propiedad`, crearPropiedad, options);
  }

  listarTipoPropiedades(idComunidad: number): Observable<TipoPropiedad[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<TipoPropiedad[]>(`${this.apiUrl}/comunidad/listar/tipo/propiedad/${idComunidad}`, options)
  }

  eliminarPropiedad(idComunidad: number, tipoPropiedad: TipoPropiedad): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.delete(`${this.apiUrl}/comunidad/eliminar/propiedad/${idComunidad}/${tipoPropiedad}`, options);
  }

  listarPropiedadesVecinoIdComunidad(idComunidad: number): Observable<Propiedad[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Propiedad[]>(`${this.apiUrl}/vecino/listar/propiedad/${idComunidad}`, options)
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Observable} from "rxjs";
import {Comunidad} from "../modelos/Comunidad";
import {Vivienda} from "../modelos/Vivienda";
import {Vecino} from "../modelos/Vecino";
import {InsertarCodigo} from "../modelos/InsertarCodigo";
import {CrearVivienda} from "../modelos/CrearVivienda";
import {EditarVivienda} from "../modelos/EditarVivienda";

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

  listarViviendasComunidad(idComunidad: number): Observable<Vivienda[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vivienda[]>(`${this.apiUrl}/comunidad/listar/viviendas/${idComunidad}`, options)
  }

  listarResidentes(idVivienda: number): Observable<Vecino[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vecino[]>(`${this.apiUrl}/vecino/listar/residentes/${idVivienda}`, options)
  }

  numeroPropietarios(idComunidad: number): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl}/numero/propietarios/${idComunidad}`, options)
  }

  listarResidentesComunidad(idVivienda: number): Observable<Vecino[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vecino[]>(`${this.apiUrl}/comunidad/listar/residentes/${idVivienda}`, options)
  }

  verInfoVivienda(idVivienda: number): Observable<Vivienda> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vivienda>(`${this.apiUrl}/comunidad/ver/info/vivienda/${idVivienda}`, options)
  }

  verPropietario(idPropietario: number): Observable<Vecino> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vecino>(`${this.apiUrl}/comunidad/ver/vecino/${idPropietario}`, options)
  }

  crearVivienda(crearVivienda: CrearVivienda): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/comunidad/crear/vivienda`, crearVivienda, options);
  }

  asignarPropietario(idVivienda: number, idPropietario: number): Observable<void> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post<void>(`${this.apiUrl}/comunidad/asginar/propietario/vivienda/${idVivienda}/${idPropietario}`, {}, options);
  }

  editarVivienda(editarVivienda: EditarVivienda, idVivienda: number): Observable<void> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post<void>(`${this.apiUrl}/comunidad/editar/vivienda/${idVivienda}`, editarVivienda, options);
  }

  eliminarResidente(idVivienda: number, idResidente: number): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.delete<any>(`${this.apiUrl}/comunidad/${idVivienda}/residentes/${idResidente}`, options);
  }

  salirComunidad(idVivienda: number, idResidente: number): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.delete<any>(`${this.apiUrl}/vecino/${idVivienda}/residentes/${idResidente}`, options);
  }
}

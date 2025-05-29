import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vecino} from "../modelos/Vecino";
import {ComunService} from "./comun.service";
import {InsertarCodigo} from "../modelos/InsertarCodigo";
import {RegistrarVecino} from "../modelos/RegistrarVecino";
import {EditarVecinoDTO} from "../modelos/EditarVecinoDTO";
import {Sancion} from "../modelos/Sancion";
import {VecinoUsuarioDTO} from "../modelos/VecinoUsuarioDTO";
import {Notificacion} from "../modelos/Notificacion";
import {Comunidad} from "../modelos/Comunidad";

@Injectable({
  providedIn: 'root'
})
export class VecinoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  cargarVecinoPorIdUsuario(idUsuario: number): Observable<Vecino> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vecino>(`${this.apiUrl}/vecino/ver/vecino/usuario/${idUsuario}`, options)
  }

  cargarVecinoPorIdVecino(idVecino: number): Observable<Vecino> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Vecino>(`${this.apiUrl}/vecino/ver/vecino/${idVecino}`, options)
  }

  editarPerfil(formData: FormData, idVecino: number): Observable<any> {
    const options = this.comunService.autorizarPeticionFormData();
    return this.http.put(`${this.apiUrl}/vecino/actualizar/${idVecino}`, formData, options);
  }

  listarVecinosComunidad(idComunidad: number): Observable<VecinoUsuarioDTO[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<VecinoUsuarioDTO[]>(`${this.apiUrl}/vecino/listar/vecinos/comunidad/${idComunidad}`, options)
  }

  verNotificaciones(idVecino: number, idComunidad: number): Observable<Notificacion[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Notificacion[]>(`${this.apiUrl}/vecino/ver/notificaciones/${idVecino}/${idComunidad}`, options)
  }

  buscarComunidadPorCodigo(codigo: string): Observable<Comunidad> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Comunidad>(`${this.apiUrl}/vecino/buscar/comunidad/codigo/${codigo}`, options)
  }

  eliminarNotificacion(idVecino: number, idNotificacion: number) {
    const options = this.comunService.autorizarPeticion();
    return this.http.post(`${this.apiUrl}/vecino/eliminar/notificacion/${idNotificacion}/${idVecino}`, {}, options)
  }
}

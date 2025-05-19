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
}

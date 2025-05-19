import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ComunService} from "./comun.service";
import {Observable} from "rxjs";
import {Mensaje} from "../modelos/Mensaje";

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private apiUrl = environment.apiUrl;

  constructor( private http: HttpClient, private comunService: ComunService) {}

  verConversacion(idEmisor: number, idReceptor: number): Observable<Mensaje[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Mensaje[]>(`${this.apiUrl}/vecino/mensaje/ver/${idEmisor}/${idReceptor}`, options);
  }

  enviarMensaje(mensaje: Mensaje): Observable<Mensaje> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post<Mensaje>(`${this.apiUrl}/vecino/mensaje/enviar`, mensaje, options);
  }

  editarMensaje(id: number, nuevoTexto: string): Observable<Mensaje> {
    const options = this.comunService.autorizarPeticion();
    return this.http.put<Mensaje>(`${this.apiUrl}/vecino/mensaje/editar/${id}`, { texto: nuevoTexto }, options);
  }

  eliminarMensaje(id: number): Observable<Mensaje> {
    const options = this.comunService.autorizarPeticion();
    return this.http.delete<Mensaje>(`${this.apiUrl}/vecino/mensaje/eliminar/${id}`, options);
  }
}

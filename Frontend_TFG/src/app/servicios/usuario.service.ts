import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../modelos/Usuario";
import {ComunService} from "./comun.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  cargarUsuario(correo: string): Observable<Usuario> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Usuario>(`${this.apiUrl}/vecino/usuario/correo/${correo}`, options);
  }
}

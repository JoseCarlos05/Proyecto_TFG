import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../modelos/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  cargarUsuario(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/vecino/usuario/correo/${correo}`);
  }
}

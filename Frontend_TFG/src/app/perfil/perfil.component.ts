import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { jwtDecode } from "jwt-decode";
import { TokenDataDTO } from "../modelos/TokenData";
import { Usuario } from "../modelos/Usuario";
import { UsuarioService } from "../servicios/usuario.service";
import { VecinoService } from "../servicios/vecino.service";
import { ComunidadService } from "../servicios/comunidad.service";
import { Vecino } from "../modelos/Vecino";
import { Comunidad } from "../modelos/Comunidad";
import { FormsModule } from "@angular/forms";
import { RegistrarVecino } from "../modelos/RegistrarVecino";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [IonicModule, CommonModule, FooterComponent, HeaderComponent, FormsModule],
  standalone: true,
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string;
  editable: boolean = false;

  editarVecino: RegistrarVecino = {
    nombre: "",
    apellidos: "",
    telefono: "",
    fechaNacimiento: "",
    numeroCuenta: "",
    dni: "",
    correo: this.usuario.correo,
    contrasena: this.usuario.contrasena,
  };

  // Toast flags
  toastSuccess = false;
  toastError = false;
  toastUsuarioError = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private vecinoService: VecinoService,
    private comunidadService: ComunidadService
  ) {}

  ngOnInit() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<{ tokenDataDTO: TokenDataDTO }>(token);
        const tokenDataDTO = decodedToken?.tokenDataDTO;
        if (tokenDataDTO && tokenDataDTO.correo) {
          this.correo = tokenDataDTO.correo;
          this.cargarUsuario(this.correo);
        }
      } catch (e) {
        console.error('Error al decodificar el token:', e);
      }
    }
  }

  cargarUsuario(correo: string): void {
    this.usuarioService.cargarUsuario(correo).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        if (this.usuario && this.usuario.id) {
          this.cargarVecino();
        }
      },
      error: (e) => {
        console.error("Error al cargar el usuario:", e);
        this.toastUsuarioError = true;
      }
    });
  }

  cargarVecino() {
    if (this.usuario.id) {
      this.vecinoService.cargarVecinoPorIdUsuario(this.usuario.id).subscribe({
        next: data => {
          this.vecino = data;
          this.editarVecino = {
            nombre: this.vecino.nombre,
            apellidos: this.vecino.apellidos,
            telefono: this.vecino.telefono,
            fechaNacimiento: this.vecino.fechaNacimiento,
            numeroCuenta: this.vecino.numeroCuenta,
            dni: this.vecino.dni,
            correo: this.usuario.correo,
            contrasena: this.usuario.contrasena,
          };
        }
      });
    }
  }

  visibleInput() {
    this.editable = !this.editable;
  }

  actualizarVecino(idVecino: number) {
    this.vecinoService.editarPerfil(this.editarVecino, idVecino).subscribe({
      next: () => {
        this.editable = false;
        this.toastSuccess = true;
        this.cargarVecino();
      },
      error: () => {
        this.toastError = true;
        console.log('Error al insertar código.');
      }
    });
  }
}

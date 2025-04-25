import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ComunidadService} from "../servicios/comunidad.service";
import {RegistrarComunidad} from "../modelos/RegistrarComunidad";
import {InsertarCodigo} from "../modelos/InsertarCodigo";
import {Vecino} from "../modelos/Vecino";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Usuario} from "../modelos/Usuario";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {Comunidad} from "../modelos/Comunidad";
import {NgForOf} from "@angular/common";
import {Vivienda} from "../modelos/Vivienda";
import {ViviendaService} from "../servicios/vivienda.service";

@Component({
    selector: 'app-unirse-comunidad',
    templateUrl: './unirse-comunidad.component.html',
    styleUrls: ['./unirse-comunidad.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    NgForOf
  ]
})
export class UnirseComunidadComponent  implements OnInit {
  correo?: string;
  private usuario!: Usuario
  private vecino!: Vecino
  comunidades: Comunidad[] = [];
  viviendas: Vivienda[] = [];

  idVivienda?: number;
  idComunidad?: number;
  idVecino?: number;

  insertarCodigo: InsertarCodigo = {
    codigoComunidad: "",
    idVecino: undefined
  }
  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private viviendaService: ViviendaService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<{ tokenDataDTO: TokenDataDTO }>(token);
        const tokenDataDTO = decodedToken?.tokenDataDTO;
        if (tokenDataDTO && tokenDataDTO.correo) {
          this.correo = tokenDataDTO.correo;
          this.cargarUsuario(this.correo);
          this.cargarComunidades();
        }
      } catch (e) {
        console.error('Error al decodificar el token:', e);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  insertarCodigoComunidad() {
    this.comunidadService.insertarCodigo(this.insertarCodigo).subscribe({
      next: () => {
        this.router.navigate(['/comunidades']);
      },
      error: () => {
        console.log('Error al insertar codigo.');
      }
    });
  }

  cargarUsuario(correo: string): void {
    this.usuarioService.cargarUsuario(correo).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        if (usuario && usuario.id) {
          this.cargarVecino(this.usuario.id)
          console.log(usuario)
        }
      },
      error: (e) => {
        console.error("Error al cargar el usuario:", e);
      }
    });
  }


  cargarVecino(idUsuario: number | undefined) {
    if (this.usuario.id) {
      this.vecinoService.cargarVecinoPorIdUsuario(this.usuario.id).subscribe({
        next: data => {
          this.vecino = data
          this.insertarCodigo.idVecino = this.vecino.id;
        }
      })
    }
  }

  solicitarUnion() {
    if (this.idVivienda && this.idComunidad && this.vecino.id) {
      this.comunidadService.solicitadUnion(this.idVivienda, this.idComunidad, this.vecino.id).subscribe({
        next: () => {
          this.router.navigate(['/comunidades']);
        },
        error: () => {
          console.log('Error al solicitar unión.');
        }
      });
    } else {
      console.warn('Faltan datos para solicitar unión.');
    }
  }


  cargarComunidades() {
    this.comunidadService.listarTodasComunidades().subscribe({
      next: (data: Comunidad[]) => {
        this.comunidades = data;
      },
      error: () => {
        console.log("Error al cargar comunidades");
      }
    });
  }

  cargarVivienda(idComunidad: number | undefined) {
    this.viviendaService.listarViviendas(idComunidad).subscribe({
      next: (data: Vivienda[]) => {
        this.viviendas = data;
      },
      error: () => {
        console.log("Error al cargar comunidades");
      }
    });
  }
}

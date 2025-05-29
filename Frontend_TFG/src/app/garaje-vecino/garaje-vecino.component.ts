import { Component, OnInit } from '@angular/core';
import {Comunidad} from "../modelos/Comunidad";
import {Gasto} from "../modelos/Gasto";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GastosService} from "../servicios/gastos.service";
import {ViviendaService} from "../servicios/vivienda.service";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {filter} from "rxjs";
import {Garaje} from "../modelos/Garaje";
import {GarajeService} from "../servicios/garaje.service";
import {HeaderComponent} from "../header/header.component";
import {IonicModule} from "@ionic/angular";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";
import {NgForOf, NgIf} from "@angular/common";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {AnadirViviendaGaraje} from "../modelos/AnadirViviendaGaraje";
import {Vivienda} from "../modelos/Vivienda";

@Component({
  selector: 'app-garaje-vecino',
  templateUrl: './garaje-vecino.component.html',
  styleUrls: ['./garaje-vecino.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    NgForOf,
    FooterComunidadComponent,
    NgIf
  ]
})
export class GarajeVecinoComponent  implements OnInit {
  comunidadObjeto!: Comunidad
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string
  listaGarajes: Garaje[] = []
  private viviendas?: Vivienda[] = []
  viviendaVecino: Vivienda = {} as Vivienda;

  bloquesGaraje: { fila1: Garaje[]; fila2: Garaje[] }[] = [];

  anadirViviendaGaraje: AnadirViviendaGaraje = {
    idGaraje: undefined,
    idVivienda: undefined
  }
  constructor(private router: Router,
              private gastosService: GastosService,
              private activateRoute: ActivatedRoute,
              private garajeService: GarajeService,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private viviendaService: ViviendaService) {
  }

  ngOnInit() {
    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
    }

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
          this.cargarVecino()
        }
      },
      error: (e) => {
        console.error("Error al cargar el usuario:", e);
      }
    });
  }

  cargarVecino() {
    if (this.usuario.id) {
      this.vecinoService.cargarVecinoPorIdUsuario(this.usuario.id).subscribe({
        next: data => {
          this.vecino = data;
          this.listarGarajesMetodo()
          this.cargarViviendas()
        }
      })
    }
  }

  organizarGarajesEnBloques() {
    this.bloquesGaraje = [];

    for (let i = 0; i < this.listaGarajes.length; i += 6) {
      const bloque = {
        fila1: this.listaGarajes.slice(i, i + 3),
        fila2: this.listaGarajes.slice(i + 3, i + 6)
      };
      this.bloquesGaraje.push(bloque);
    }
  }


  listarGarajesMetodo() {
    if (this.comunidadObjeto.id) {
      this.garajeService.listarGarajesVecino(this.comunidadObjeto.id).subscribe({
        next: data => {
          this.listaGarajes = data.sort((a, b) => {
            const numeroA = parseInt(a.numeroPlaza.replace('P', ''), 10);
            const numeroB = parseInt(b.numeroPlaza.replace('P', ''), 10);
            return numeroA - numeroB;
          });

          this.organizarGarajesEnBloques();
        }
      });
    }
  }



  cargarViviendas() {
    this.viviendaService.listarViviendas(this.comunidadObjeto.id).subscribe({
      next: data => {
        this.viviendas = data
        this.cargarViviendaVecino()
      }
    })
  }

  cargarViviendaVecino() {
    if (this.viviendas) {
      for (const vivienda of this.viviendas) {
        if (this.vecino && vivienda.idVecinos.includes(this.vecino.id)) {
          this.viviendaVecino = vivienda
          this.anadirViviendaGaraje.idVivienda = this.viviendaVecino.id
          break
        }
      }
    }
  }

  anadirVivienda(idGaraje: number) {
    this.anadirViviendaGaraje.idGaraje = idGaraje;
    this.garajeService.anadirViviendaGaraje(this.anadirViviendaGaraje).subscribe({
      next: () => {
        const toast = document.getElementById("exitoCreacion") as any;
        toast.present();
        this.listarGarajesMetodo();
      },
      error: () => {
        const toast = document.getElementById("errorReserva") as any;
        toast.present();
      }
    });
  }

  obtenerNombreVivienda(idVivienda: number | null | undefined): string {
    if (!idVivienda || !this.viviendas) return 'Sin asignar';
    const vivienda = this.viviendas.find(v => Number(v.id) === Number(idVivienda));
    return vivienda ? vivienda.direccionPersonal : 'Sin asignar';
  }




}

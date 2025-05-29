import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule, ToastController} from "@ionic/angular";
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Usuario} from "../modelos/Usuario";
import {Vecino} from "../modelos/Vecino";
import {Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {VecinoService} from "../servicios/vecino.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Comunidad} from "../modelos/Comunidad";
import {ViviendaService} from "../servicios/vivienda.service";
import {Vivienda} from "../modelos/Vivienda";
import {Sancion} from "../modelos/Sancion";
import {SancionService} from "../servicios/sancion.service";
import {GastosService} from "../servicios/gastos.service";
import {Gasto} from "../modelos/Gasto";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-perfil-comunidad',
  templateUrl: './perfil-comunidad.component.html',
  styleUrls: ['./perfil-comunidad.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    FooterComunidadComponent,
    NgIf,
    NgForOf,
    NgOptimizedImage
  ]
})
export class PerfilComunidadComponent  implements OnInit {
  baseUrl: string = environment.apiUrl;

  private usuario?: Usuario
  vecino?: Vecino
  propietario?: Vecino;
  vecinoFoto: Vecino = {} as Vecino;

  private correo!: string
  private comunidad!: Comunidad
  private viviendas?: Vivienda[] = []
  viviendaVecino: Vivienda = {} as Vivienda;
  residentes: Vecino[] = []
  sancionesVecino: Sancion[] = []
  deudasVecino: Gasto[] = []

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private vecinoService: VecinoService,
    private viviendaService: ViviendaService,
    private sancionService: SancionService,
    private gastosService: GastosService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.inicio();
  }

  async mostrarToast(mensaje: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }

  inicio() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<{ tokenDataDTO: TokenDataDTO }>(token);
        const tokenDataDTO = decodedToken?.tokenDataDTO;
        if (tokenDataDTO && tokenDataDTO.correo) {
          this.correo = tokenDataDTO.correo;
          this.cargarUsuario(this.correo);
          this.cargarComunidad()
        }
      } catch (e) {
        console.error('Error al decodificar el token:', e);
        this.mostrarToast('Ocurrió un error al cargar los datos.', 'danger');
      }
    } else {
      this.router.navigate(['/']);
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
      error: () => {
        this.mostrarToast('Ocurrió un error al cargar los datos.', 'danger');
      }
    });
  }

  cargarVecino() {
    if (this.usuario) {
      this.vecinoService.cargarVecinoPorIdUsuario(this.usuario.id).subscribe({
        next: data => {
          this.vecino = data
          this.vecinoFoto = data
          this.cargarComunidad()
        }
      });
    }
  }

  cargarComunidad() {
    const comunidadStorage = sessionStorage.getItem('comunidad');
    if (comunidadStorage) {
      this.comunidad = JSON.parse(comunidadStorage);
      this.cargarViviendas()
    }
  }

  cargarViviendas() {
    this.viviendaService.listarViviendas(this.comunidad.id).subscribe({
      next: data => {
        this.viviendas = data
        this.cargarViviendaVecino()
      }
    })
  }

  cargarViviendaVecino() {
    if (this.viviendas) {
      for (const vivienda of this.viviendas) {
        if (this.vecino && vivienda.idVecinos.includes(this.vecino?.id)) {
          this.viviendaVecino = vivienda
          this.listarResidentes(vivienda.id)
          break
        }
      }
    }
  }

  listarResidentes(idVivienda: number) {
    this.residentes = [];
    let resultado = [];
    this.viviendaService.listarResidentes(idVivienda).subscribe({
      next: data => {
        for (const vecino of data) {
          if (this.vecino?.id !== vecino.id) {
            resultado.push(vecino);
          }
        }
        this.residentes = resultado.filter((obj, index, self) =>
          index === self.findIndex(o => o.id === obj.id));
        this.cargarPropietario()
      },
      error: () => {
        this.mostrarToast('Ocurrió un error al cargar los datos.', 'danger');
      }
    });
  }

  cargarPropietario() {
    if (this.viviendaVecino && this.viviendaVecino.idPropietario && this.residentes ) {
      this.vecinoService.cargarVecinoPorIdVecino(this.viviendaVecino.idPropietario).subscribe({
        next: data => {
          this.propietario = data
          if (this.propietario && this.propietario.id) {
            this.cargarSanciones(this.propietario.id)
            this.cargarGastos(this.propietario.id)
          }
        }
      })
    }
  }

  cargarSanciones(idPropietario: number) {
    if (this.vecino) {
      this.sancionService.listarSancionesVecino(this.comunidad.id, idPropietario).subscribe({
        next: data => this.sancionesVecino = data
      })
    }
  }

  cargarGastos(idPropietario: number) {
    this.deudasVecino = [];
    this.gastosService.listarGastos(this.comunidad.id).subscribe({
      next: data => {
        for (const gasto of data) {
          if (this.propietario && !gasto.pagados.includes(idPropietario)) {
            this.deudasVecino.push(gasto)
          }
        }
      },
      error: () => {
        this.mostrarToast('Ocurrió un error al cargar los datos.', 'danger');
      }
    });
  }

  comprobarIdentidad(): string {
    if (this.vecino) {
      if (this.vecino.id === this.comunidad.idPresidente) {
        return "Presidente de la comunidad";
      } else if (this.vecino.id === this.propietario?.id) {
        return `Propietario de la vivienda ${this.viviendaVecino.direccionPersonal}`;
      } else {
        return `Residiento en la vivienda ${this.viviendaVecino.direccionPersonal}`;
      }
    }
    return "";
  }

  irGasto(idGasto: number) {
    this.router.navigate([`/comunidad/gastos/gasto/${idGasto}`])
  }

  getImageUrlVecino(vecino: Vecino): string {
    if (!vecino.fotoPerfil || vecino.fotoPerfil.trim() === '') {
      return 'assets/icon/perfiles/26.png';
    } else if (vecino.fotoPerfil.startsWith('http')) {
      return vecino.fotoPerfil;
    } else {
      return `${this.baseUrl}${vecino.fotoPerfil}`;
    }
  }

  textoListadoVecino(): string {
    if (this.vecino?.id === this.propietario?.id) {
      return 'Residentes en tu propiedad'
    } else {
      return 'Vecinos en tu residencia'
    }
  }

  textoSanciones(): string {
    if (this.vecino?.id === this.propietario?.id) {
      return 'Tus sanciones'
    } else {
      return 'Sanciones a tu vivienda'
    }
  }

  textoDeudas(): string {
    if (this.vecino?.id === this.propietario?.id) {
      return 'Tus deudas'
    } else {
      return 'Deudas de tu vivienda'
    }
  }

  comprobarIdentidadResidente(vecino: Vecino): string {
    if (vecino.id === this.propietario?.id) {
      return 'Propietario'
    } else if (vecino.id === this.comunidad.idPresidente) {
      return 'Presidente de la comunidad'
    }
    return ''
  }
}

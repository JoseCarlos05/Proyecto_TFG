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
import {NgForOf, NgIf} from "@angular/common";
import {Comunidad} from "../modelos/Comunidad";
import {ViviendaService} from "../servicios/vivienda.service";
import {Vivienda} from "../modelos/Vivienda";
import {Sancion} from "../modelos/Sancion";
import {SancionService} from "../servicios/sancion.service";
import {GastosService} from "../servicios/gastos.service";
import {Gasto} from "../modelos/Gasto";

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
    NgForOf
  ]
})
export class PerfilComunidadComponent implements OnInit {

  private usuario?: Usuario
  vecino?: Vecino
  private correo!: string
  private comunidad!: Comunidad
  private viviendas?: Vivienda[] = []
  residentesEnPropiedad: Vecino[] = []
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
          this.vecino = data;
          this.cargarComunidad();
        },
        error: () => {
          this.mostrarToast('Ocurrió un error al cargar los datos.', 'danger');
        }
      });
    }
  }

  cargarComunidad() {
    const comunidadStorage = sessionStorage.getItem('comunidad');
    if (comunidadStorage) {
      this.comunidad = JSON.parse(comunidadStorage);
      this.cargarViviendas();
      this.cargarSanciones();
      this.cargarGastos();
      this.mostrarToast('Datos cargados correctamente.', 'success');
    } else {
      this.mostrarToast('No se encontraron datos para mostrar.', 'warning');
    }
  }

  cargarSanciones() {
    if (this.vecino) {
      this.sancionService.listarSancionesVecino(this.comunidad.id, this.vecino.id).subscribe({
        next: data => this.sancionesVecino = data,
        error: () => {
          this.mostrarToast('Ocurrió un error al cargar los datos.', 'danger');
        }
      });
    }
  }

  cargarViviendas() {
    this.viviendaService.listarViviendas(this.comunidad.id).subscribe({
      next: data => {
        this.viviendas = data;
        this.listarResidentes();
      },
      error: () => {
        this.mostrarToast('Ocurrió un error al cargar los datos.', 'danger');
      }
    });
  }

  cargarGastos() {
    this.deudasVecino = [];
    this.gastosService.listarGastos(this.comunidad.id).subscribe({
      next: data => {
        for (const gasto of data) {
          if (this.vecino && !gasto.pagados.includes(this.vecino?.id)) {
            this.deudasVecino.push(gasto);
          }
        }
      },
      error: () => {
        this.mostrarToast('Ocurrió un error al cargar los datos.', 'danger');
      }
    });
  }

  listarResidentes() {
    this.residentesEnPropiedad = [];
    let resultado = [];
    for (const vivienda of this.propiedadesVecino()) {
      this.viviendaService.listarResidentes(vivienda.id).subscribe({
        next: data => {
          for (const vecino of data) {
            if (this.vecino?.id !== vecino.id) {
              resultado.push(vecino);
            }
          }
          this.residentesEnPropiedad = resultado.filter((obj, index, self) =>
            index === self.findIndex(o => o.id === obj.id));
        },
        error: () => {
          this.mostrarToast('Ocurrió un error al cargar los datos.', 'danger');
        }
      });
    }
  }

  propiedadesVecino(): Vivienda[] {
    let listaViviendas: Vivienda[] = [];
    if (this.viviendas) {
      for (const vivienda of this.viviendas) {
        if (this.vecino && vivienda.idPropietario === this.vecino.id) {
          listaViviendas.push(vivienda);
        }
      }
    }
    return listaViviendas;
  }

  residenciasVecino(): Vivienda[] {
    let listaViviendas: Vivienda[] = [];
    if (this.viviendas) {
      for (const vivienda of this.viviendas) {
        if (this.vecino && vivienda.idVecinos) {
          if (vivienda.idVecinos.includes(this.vecino.id) && vivienda.idPropietario !== this.vecino.id) {
            listaViviendas.push(vivienda);
          }
        }
      }
    }
    return listaViviendas;
  }

  comprobarIdentidad(): string {
    const propiedades = this.propiedadesVecino().length;
    const residencias = this.residenciasVecino().length;

    if (this.vecino) {
      if (this.vecino.id === this.comunidad.idPresidente) {
        return "Presidente de la comunidad";
      } else if (propiedades > 0) {
        const lista = this.propiedadesVecino();
        if (propiedades === 1) {
          return "Propietario de la vivienda " + lista[0].direccionPersonal;
        } else {
          return "Propietario de las viviendas: " + lista.map(v => v.direccionPersonal).join(", ");
        }
      } else {
        const lista = this.residenciasVecino();
        if (residencias === 1) {
          return "Residiendo en la vivienda " + lista[0].direccionPersonal;
        } else {
          return "Residiendo en las viviendas: " + lista.map(v => v.direccionPersonal).join(", ");
        }
      }
    }
    return "";
  }

  irGasto(idGasto: number) {
    this.router.navigate([`/comunidad/gastos/gasto/${idGasto}`]);
  }
}

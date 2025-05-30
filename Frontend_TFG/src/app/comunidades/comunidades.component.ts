import {Component, OnInit} from '@angular/core';
import {AlertController, IonicModule, ToastController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import { jwtDecode } from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {UsuarioService} from "../servicios/usuario.service";
import {Usuario} from "../modelos/Usuario";
import {VecinoService} from "../servicios/vecino.service";
import {Vecino} from "../modelos/Vecino";
import {ComunidadService} from "../servicios/comunidad.service";
import {Comunidad} from "../modelos/Comunidad";
import {ViviendaService} from "../servicios/vivienda.service";
import {Vivienda} from "../modelos/Vivienda";
import {Observable} from "rxjs";

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.scss'],
  imports: [IonicModule, CommonModule, FooterComponent, HeaderComponent],
  standalone: true,
})
export class ComunidadesComponent implements OnInit {

  private usuario!: Usuario
  vecino!: Vecino
  listaComunidades: Comunidad[] = []
  listaViviendas: Vivienda[] = []
  correo!: string
  todasComunidades: Comunidad[] = []
  viviendaVecino: Vivienda = {} as Vivienda;

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private comunidadService: ComunidadService,
              private viviendaService: ViviendaService,
              private alertController: AlertController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.inicio()
  }

  ionViewWillEnter() {
    this.inicio()
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
          this.vecino = data
          this.listarComunidades()
        }
      })
    }
  }

  listarComunidades() {
    if (this.vecino.id) {
      this.comunidadService.listarComunidades(this.vecino.id).subscribe({
        next: data => {
          this.todasComunidades = data;
          this.listaComunidades = data;
        }
      });
    }
  }

  filtrarComunidades(event: any): void {
    const texto = event.target?.value?.toLowerCase() || '';
    this.listaComunidades = this.todasComunidades.filter(comunidad =>
      comunidad.nombre.toLowerCase().includes(texto) ||
      comunidad.direccion.toLowerCase().includes(texto)
    );
  }

  cargarViviendas(idComunidad: number): Observable<Vivienda[]> {
    return this.viviendaService.listarViviendas(idComunidad);
  }

  navigateToComunidad(comunidad: Comunidad) {
    if (comunidad?.id) {
      sessionStorage.setItem('comunidad', JSON.stringify(comunidad));
      this.router.navigate(['/comunidad/elecciones']);
    }
  }

  async confirmarSalida(event: Event, comunidad: Comunidad) {
    event.stopPropagation();

    const alert = await this.alertController.create({
      header: 'Confirmar salida',
      message: `¿Estás seguro de que quieres salir de la comunidad ${comunidad.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          role: 'destructive',
          handler: () => {
            if (this.vecino?.id && comunidad?.id) {
              this.cargarViviendas(comunidad.id).subscribe({
                next: (viviendas: Vivienda[]) => {
                  const vivienda = viviendas.find(v => Array.isArray(v.idVecinos) && v.idVecinos.includes(this.vecino.id));
                  if (vivienda && vivienda.id) {
                    this.viviendaService.salirComunidad(vivienda.id, this.vecino.id).subscribe({
                      next: async () => {
                        this.listaComunidades = this.listaComunidades.filter(c => c.id !== comunidad.id);
                        const toast = await this.toastController.create({
                          message: 'Has salido correctamente de la comunidad.',
                          duration: 2000,
                          color: 'success',
                          position: 'top'
                        });
                        await toast.present();
                      },
                      error: async () => {
                        const toast = await this.toastController.create({
                          message: 'Error al salir de la comunidad.',
                          duration: 2000,
                          color: 'danger',
                          position: 'top'
                        });
                        await toast.present();
                      }
                    });
                  } else {
                    this.toastController.create({
                      message: 'No se encontró tu vivienda en esta comunidad.',
                      duration: 2000,
                      color: 'warning',
                      position: 'top'
                    }).then(toast => toast.present());
                  }
                },
                error: () => {
                  this.toastController.create({
                    message: 'Error al obtener las viviendas.',
                    duration: 2000,
                    color: 'danger',
                    position: 'top'
                  }).then(toast => toast.present());
                }
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}

import {Component, OnInit} from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {Usuario} from "../modelos/Usuario";
import {Comunidad} from "../modelos/Comunidad";
import {CrearGasto} from "../modelos/CrearGasto";
import {ComunidadService} from "../servicios/comunidad.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";
import {GastosService} from "../servicios/gastos.service";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../modelos/TokenData";
import {Vecino} from "../modelos/Vecino";
import {ViviendaService} from "../servicios/vivienda.service";
import {Vivienda} from "../modelos/Vivienda";
import {VecinoService} from "../servicios/vecino.service";
import {MenuInferiorComunidadComponent} from "../menu-inferior-comunidad/menu-inferior-comunidad.component";

@Component({
  selector: 'app-info-vivienda',
  templateUrl: './info-vivienda.component.html',
  styleUrls: ['./info-vivienda.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonicModule,
    NgForOf,
    NgIf,
    MenuInferiorComunidadComponent
  ]
})
export class InfoViviendaComponent implements OnInit {
  correo?: string;
  private usuario!: Usuario
  private comunidad!: Comunidad
  vivienda!: Vivienda

  vecino!: Vecino;
  idVivienda!: number;
  residentesEnPropiedad: Vecino[] = []


  constructor(private comunidadService: ComunidadService,
              private router: Router,
              private usuarioService: UsuarioService,
              private gastoService: GastosService,
              private activateRoute: ActivatedRoute,
              private viviendaService: ViviendaService) {
  }

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
    } else {
      this.router.navigate(['/']);
    }

    this.activateRoute.params.subscribe(params => {
      this.idVivienda = Number(params['id']);
    });
    this.verInfoVivienda(this.idVivienda)



  }

  cargarUsuario(correo: string): void {
    this.usuarioService.cargarUsuarioComunidad(correo).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        if (this.usuario && this.usuario.id) {
          this.cargarComunidad()
        }
      },
      error: (e) => {
        console.error("Error al cargar el usuario:", e);
      }
    });
  }

  cargarComunidad() {
    if (this.usuario.id) {
      this.comunidadService.cargarComunidadPorIdUsuario(this.usuario.id).subscribe({
        next: data => {
          this.comunidad = data
        }
      })
    }
  }

  listarResidentes() {
    this.residentesEnPropiedad = []
    let resultado = []
    this.viviendaService.listarResidentesComunidad(this.vivienda.id).subscribe({
      next: data => {
        for (const vecino of data) {
          if (this.vecino?.id !== vecino.id) {
            resultado.push(vecino)
          }
        }
        this.residentesEnPropiedad = resultado.filter((obj, index, self) =>
          index === self.findIndex(o => o.id === obj.id))
      }
    })

  }

  verInfoVivienda(idVivienda: number) {
    this.viviendaService.verInfoVivienda(idVivienda).subscribe({
      next: data => {
        this.vivienda = data;
        this.cargarPropietario()
        this.listarResidentes()
      }
    })
  }

  cargarPropietario(){
    this.viviendaService.verPropietario(this.vivienda.idPropietario).subscribe({
      next: data => {
        this.vecino = data;
        console.log(this.vecino)
      }
    })
  }

  comprobarIdentidad(): string {

    if (this.vecino) {
      if (this.vecino.id === this.comunidad.idPresidente) {
        return "Presidente de la comunidad"

      } else if (this.vecino.id === this.vivienda.idPropietario) {
          return "Propietario de la vivienda " + this.vivienda.direccionPersonal

      } else {
          return "Esta vivienda no tiene propietario " + this.vivienda.direccionPersonal
      }
    }
    return ""
  }

}

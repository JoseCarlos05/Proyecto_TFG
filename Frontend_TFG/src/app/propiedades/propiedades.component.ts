import { Component, OnInit } from '@angular/core';
import {FooterComunidadComponent} from "../footer-comunidad/footer-comunidad.component";
import {HeaderComponent} from "../header/header.component";
import {HeaderComunidadComponent} from "../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
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
import {PropiedadService} from "../servicios/propiedad.service";
import {TipoPropiedad} from "../enum/TipoPropiedad";
import {Propiedad} from "../modelos/Propiedad";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-propiedades',
    templateUrl: './propiedades.component.html',
    styleUrls: ['./propiedades.component.scss'],
    standalone: true,
  imports: [
    FooterComunidadComponent,
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    NgForOf,
    NgIf
  ]
})
export class PropiedadesComponent  implements OnInit {
  listaPropiedades: Propiedad[] = []
  propiedadesEnFilas: Propiedad[][] = [];

  comunidadObjeto!: Comunidad
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string
  constructor(private router: Router,
              private gastosService: GastosService,
              private activateRoute: ActivatedRoute,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService,
              private propiedadService: PropiedadService) {
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
          this.listarPropiedades()
        }
      })
    }
  }

  listarPropiedades() {
    if (this.comunidadObjeto?.id)
      this.propiedadService.listarPropiedadesVecinoIdComunidad(this.comunidadObjeto.id).subscribe({
        next: data => {
          this.listaPropiedades = data
          console.log(this.listaPropiedades)
          this.listaPropiedades = data;
          this.propiedadesEnFilas = this.getPropiedadesEnFilas(data);

        }
      })
  }

  obtenerImagenPropiedad(tipo: TipoPropiedad): string {
    const mapaImagenes: { [key in TipoPropiedad]: string } = {
      [TipoPropiedad.GARAJE]: 'assets/icon/propiedades/garaje.png',
      [TipoPropiedad.PISCINA]: 'assets/icon/propiedades/piscina.png',
      [TipoPropiedad.PISTA_DEPORTIVA]: 'assets/icon/propiedades/futbol.png',
      [TipoPropiedad.ZONAS_COMUNES]: 'assets/icon/propiedades/cafe.png'
    };

    return mapaImagenes[tipo] || 'assets/icon/propiedades/default.png';
  }

  getPropiedadesEnFilas(lista: Propiedad[]): Propiedad[][] {
    const filas: Propiedad[][] = [];
    for (let i = 0; i < lista.length; i += 2) {
      filas.push(lista.slice(i, i + 2));
    }
    return filas;
  }

  navigateTo(propiedad: Propiedad){
    if (propiedad.tipoPropiedad == "GARAJE") {
      this.router.navigate(["/ver-garaje"])
    }
    if (propiedad.tipoPropiedad == "PISTA_DEPORTIVA"){
      this.router.navigate(["/ver-pistas-vecino"])
    }
    if (propiedad.tipoPropiedad == "PISCINA"){
      this.router.navigate(["/info-piscina"])
    }
  }

}

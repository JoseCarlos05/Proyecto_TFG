import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {HeaderComunidadComponent} from "../../header-comunidad/header-comunidad.component";
import {IonicModule} from "@ionic/angular";
import {FooterComunidadComponent} from "../../footer-comunidad/footer-comunidad.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GastosService} from "../../servicios/gastos.service";
import {Comunidad} from "../../modelos/Comunidad";
import {Gasto} from "../../modelos/Gasto";
import {Vecino} from "../../modelos/Vecino";
import {ViviendaService} from "../../servicios/vivienda.service";
import {loadStripe} from "@stripe/stripe-js";
import {Eleccion} from "../../modelos/Eleccion";
import {jwtDecode} from "jwt-decode";
import {TokenDataDTO} from "../../modelos/TokenData";
import {Usuario} from "../../modelos/Usuario";
import {UsuarioService} from "../../servicios/usuario.service";
import {VecinoService} from "../../servicios/vecino.service";
import {NgIf} from "@angular/common";
import {filter} from "rxjs";

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderComunidadComponent,
    IonicModule,
    FooterComunidadComponent
  ]
})
export class GastoComponent implements OnInit {
  comunidadObjeto!: Comunidad
  gasto: Gasto = {} as Gasto;
  idGasto!: number;
  numeroVivenda: number = 0;
  totalPorVecino: number = 0;
  porcentajePagado: number = 0;
  usuario: Usuario = {} as Usuario;
  vecino: Vecino = {} as Vecino;
  correo?: string
  constructor(private router: Router,
              private gastosService: GastosService,
              private activateRoute: ActivatedRoute,
              private viviendaService: ViviendaService,
              private usuarioService: UsuarioService,
              private vecinoService: VecinoService) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.idGasto = Number(params['id']);
    });

    const comunidad = sessionStorage.getItem('comunidad');
    if (comunidad) {
      this.comunidadObjeto = JSON.parse(comunidad);
      this.numeroViviendas(this.comunidadObjeto.id)
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

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (!event.urlAfterRedirects.includes('/gastos/gasto')) {
          sessionStorage.removeItem('gasto');
        }
      });

    this.verGasto(this.idGasto)
    this.calcularPorcentajePagado(this.idGasto)
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
        }
      })
    }
  }

  verGasto(idGasto: number) {
    if (idGasto)
      this.gastosService.verGasto(idGasto).subscribe({
        next: data => {
          this.gasto = data;
          sessionStorage.setItem('gasto', JSON.stringify(this.gasto));
          if (this.numeroVivenda > 0) {
            this.totalPorVecino = this.gasto.total / this.numeroVivenda;
          }
        }
      });
  }

  numeroViviendas(idComunidad: number) {
    if (idComunidad)
      this.viviendaService.numeroViviendas(idComunidad).subscribe({
        next: data => this.numeroVivenda = data
      })
  }

  calcularPorcentajePagado(idGasto: number) {
    if (idGasto)
      this.gastosService.calcularPorcentajePagado(idGasto).subscribe({
        next: data => {
          this.porcentajePagado = data
        }
      })
  }

  stripeClavePublica = 'pk_test_51RIofJQu2AOfAVJhL5JoD26V1FmzcDjuqnKvY2jXakWcYFC3Xvdgy0AvwyW8vZVsHYmjoPyysEuyQDIObfo9jURb006ljK69KO';

  async iniciarPago() {
    const stripe = await loadStripe(this.stripeClavePublica);
    const idSesion = await this.crearSesionPago();

    if (stripe && idSesion) {
      stripe.redirectToCheckout({ sessionId: idSesion });
    }
  }

  async crearSesionPago(): Promise<string> {
    const respuesta = await fetch('http://localhost:8080/api/pago/crear-sesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gasto: 'Pago de gasto de comunidad: '+ this.gasto.concepto,
        cantidad: Math.round(this.totalPorVecino * 100)
      })
    });

    const datos = await respuesta.json();
    return datos.idSesion;
  }

  estaPagado(gasto: Gasto): boolean {
    if (!gasto || !Array.isArray(gasto.pagados) || this.vecino.id == null) {
      return false;
    }
    return gasto.pagados.includes(this.vecino.id);
  }
}

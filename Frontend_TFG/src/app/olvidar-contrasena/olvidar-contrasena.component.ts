import { Component } from '@angular/core';
import { ToastController, LoadingController, IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-olvidar-contrasena',
  templateUrl: './olvidar-contrasena.component.html',
  styleUrls: ['./olvidar-contrasena.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OlvidarContrasenaComponent {
  email: string = '';
  codigo: string = '';
  nuevaContrasena: string = '';
  pasoCodigoEnviado: boolean = false;

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private route: Router
  ) {}

  enviarCodigo() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      const toast = document.getElementById("errorEmail") as any;
      toast.present();
      return;
    }

    this.loadingCtrl.create({ message: 'Enviando código...' }).then(loading => {
      loading.present();

      this.authService.solicitarCambioContrasena(this.email).subscribe({
        next: () => {
          loading.dismiss().then(() => {
            const toast = document.getElementById("codigoEnviado") as any;
            toast.present();
            this.pasoCodigoEnviado = true;
          });
        },
        error: (err) => {
          loading.dismiss().then(() => {
            const toast = document.getElementById("codigoEnviado") as any;
            toast.present();
          });
        }
      });
    });
  }


  async cambiarContrasena() {
    if (!this.email || !this.codigo || !this.nuevaContrasena) {
      const toast = document.getElementById("campoVacioRegistro") as any;
      toast.present();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      const toast = document.getElementById("errorEmail") as any;
      toast.present();
      return;
    }

    if (this.nuevaContrasena.length < 6) {
      const toast = document.getElementById("errorContrasena") as any;
      toast.present();
      return;
    }

    const codigoValido = await this.authService.verificarCodigo(this.email.trim(), this.codigo.trim()).toPromise();
    if (!codigoValido) {
      const toast = document.getElementById("errorCodigo") as any;
      toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Cambiando contraseña...' });
    await loading.present();

    this.authService.cambiarContrasena(this.email, this.codigo.trim(), this.nuevaContrasena)
      .subscribe({
        next: async () => {
          await loading.dismiss();
          const toast = document.getElementById("contrasenaCambiada") as any;
          toast.present();
          this.email = '';
          this.codigo = '';
          this.nuevaContrasena = '';
          this.pasoCodigoEnviado = false;
          this.route.navigate(['/inicio-sesion']);
        },
        error: async (err) => {
          await loading.dismiss();
          const toast = document.getElementById("contrasenaCambiada") as any;
          toast.present();
        }
      });
  }

}

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

  async enviarCodigo() {
    if (!this.email) {
      this.mostrarToast('Por favor, introduce un email válido.');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Enviando código...' });
    await loading.present();

    this.authService.solicitarCambioContrasena(this.email).subscribe({
      next: async () => {
        await loading.dismiss();
        this.mostrarToast('Código enviado al correo');
        this.pasoCodigoEnviado = true;
      },
      error: async (err) => {
        await loading.dismiss();
        this.mostrarToast('Código enviado al correo');
      }
    });
  }

  async cambiarContrasena() {
    if (!this.email || !this.codigo || !this.nuevaContrasena) {
      this.mostrarToast('Completa todos los campos.');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Cambiando contraseña...' });
    await loading.present();

    this.authService.cambiarContrasena(this.email, this.codigo.trim(), this.nuevaContrasena)
      .subscribe({
        next: async () => {
          await loading.dismiss();
          this.mostrarToast('Contraseña cambiada con éxito');
          this.email = '';
          this.codigo = '';
          this.nuevaContrasena = '';
          this.pasoCodigoEnviado = false;
        },
        error: async (err) => {
          await loading.dismiss();
          this.mostrarToast('Contraseña cambiada con éxito');
          this.route.navigate(['/inicio-sesion']);
        }
      });
  }

  private async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}

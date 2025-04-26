import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton, IonItem, IonLabel, IonText, IonNote, IonButtons} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonNote, IonText, IonLabel, IonItem, 
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonCard,
    IonItem,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    CommonModule,
    FormsModule,
    RouterModule,
    IonButtons
  ]
})
export class RegisterPage {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router:Router) {}

  async register() {
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const { error } = await this.authService.signUp(this.email, this.password);
      if (error) {
        this.errorMessage = 'No se pudo registrar: ' + error.message;
        return;
      }

      this.successMessage = '¡Cuenta creada exitosamente! Revisá tu email.';
      this.email = '';
      this.password = '';
    } catch (err) {
      this.errorMessage = 'Error inesperado al registrarse.';
    }
  }

  getEmailError(input: NgModel): string {
    if (input.errors?.['required']) return 'El correo es obligatorio.';
    if (input.errors?.['email']) return 'El correo no tiene un formato válido.';
    return '';
  }

  getPasswordError(input: NgModel): string {
    if (input.errors?.['required']) return 'La contraseña es obligatoria.';
    if (input.errors?.['minlength']) return 'La contraseña debe tener al menos 6 caracteres.';
    return '';
  };

  volverAlHome() {
    this.router.navigate(['/home']);
  };
}

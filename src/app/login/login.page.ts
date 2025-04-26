import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonButton, IonInput, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonTitle, IonButtons, IonToolbar,  
    CommonModule,
    FormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    RouterModule,
    ReactiveFormsModule,
    IonHeader
  ]
})
export class LoginPage {

  loginForm: FormGroup;
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  async login() {
    const { email, password } = this.loginForm.value;
    try {
      const { data, error } = await this.authService.signIn(email, password);
      if (error) {
        if (error.message === 'Invalid login credentials') {
          this.errorMessage = 'Email o contraseña incorrectos.';
        } else if (error.message === 'missing email or phone') {
          this.errorMessage = 'Falta email o contraseña.';
        }else{
          this.errorMessage = error.message;
        }
        return;
      }

      // Opcional: navegar a otra ruta
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home']);
      });
      console.log('Login exitoso:', data.user);
    } catch (err) {
      this.errorMessage = 'Error al iniciar sesión.';
    }
  };

  autocompletarLogin(email:String) {
    this.loginForm.patchValue({
      email: email,
      password: "1234hola"
    })
  };

  volverAlHome() {
    this.router.navigate(['/home']);
  };
}

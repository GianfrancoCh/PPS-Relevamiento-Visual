import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonText } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '@supabase/supabase-js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonText, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, RouterModule, IonButton, CommonModule, IonButtons],
})
export class HomePage implements OnInit{

  user: User | null = null;
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log('Usuario en home:', user);
    });
  };
  
  goToLogin() {
    this.router.navigate(['/login']);
  };
  
  goToRegister() {
    this.router.navigate(['/register']);
  };

  logout() {
    this.authService.signOut(); // Esto también redirige al login
  };

}

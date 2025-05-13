import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/angular/standalone';
import { FotosManagerComponent } from '../fotos-manager/fotos-manager.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotos-lindas',
  templateUrl: './fotos-lindas.page.html',
  styleUrls: ['./fotos-lindas.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FotosManagerComponent]
})
export class FotosLindasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  volverAlHome() {
    this.router.navigate(['/home']);
  };

}

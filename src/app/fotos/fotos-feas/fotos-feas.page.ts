import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton } from '@ionic/angular/standalone';
import { FotosManagerComponent } from '../fotos-manager/fotos-manager.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotos-feas',
  templateUrl: './fotos-feas.page.html',
  styleUrls: ['./fotos-feas.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FotosManagerComponent]
})
export class FotosFeasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  volverAlHome() {
    this.router.navigate(['/home']);
  };

}

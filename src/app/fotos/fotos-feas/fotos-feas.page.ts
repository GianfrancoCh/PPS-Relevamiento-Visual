import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FotosManagerComponent } from '../fotos-manager/fotos-manager.component';


@Component({
  selector: 'app-fotos-feas',
  templateUrl: './fotos-feas.page.html',
  styleUrls: ['./fotos-feas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FotosManagerComponent]
})
export class FotosFeasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

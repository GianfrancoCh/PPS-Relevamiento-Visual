import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SupabaseService } from '../../services/supabase.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { IonContent, IonButtons, IonItem, IonList, IonLabel, IonButton, IonThumbnail} from "@ionic/angular/standalone";
import { User } from '@supabase/supabase-js';
import { FotoService } from 'src/app/services/foto.service';
import { CommonModule } from '@angular/common';
import { FotosListaComponent } from '../fotos-lista/fotos-lista.component';
import { F } from '@angular/router/router_module.d-6zbCxc1T';

@Component({
  selector: 'app-fotos-manager',
  templateUrl: './fotos-manager.component.html',
  styleUrls: ['./fotos-manager.component.scss'],
  imports: [IonContent, IonButtons, IonItem, IonList, IonLabel, IonButton, IonThumbnail, CommonModule, FotosListaComponent],
})
export class FotosManagerComponent implements OnInit {
  @Input() tipo: 'linda' | 'fea' = 'linda'; // <-- tipo recibido
  fotos: any[] = [];
  user: User | null = null;

  constructor(
    private supabase: SupabaseService,
    private authService: AuthService,
    private fotoService : FotoService,
    private storageService: StorageService
  ) {}

  ngOnInit() {

    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log('Usuario en home:', user);
    });
  }

  async tomarFoto() {
    try {
      const webPath = await this.fotoService.addNewToGallery();
      if (webPath) {
        console.log('Foto tomada:', webPath);
        this.fotos.push({ webPath });
  
        // Subir la imagen a Supabase Storage
        if (this.user) {
          await this.storageService.uploadImage(webPath.toString(), this.user.email!, this.tipo);
          console.log('Imagen subida exitosamente a Supabase');
        }
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

 
}

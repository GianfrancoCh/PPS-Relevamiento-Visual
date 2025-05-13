import { Component, Input, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SupabaseService } from '../../services/supabase.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { IonContent, IonButtons, IonItem, IonList, IonLabel, IonButton, IonThumbnail, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { User } from '@supabase/supabase-js';
import { FotoService } from 'src/app/services/foto.service';
import { CommonModule } from '@angular/common';
import { FotosListaComponent } from '../fotos-lista/fotos-lista.component';
import { ViewChild } from '@angular/core';
import { GraficosComponent } from '../graficos/graficos.component';


@Component({
  selector: 'app-fotos-manager',
  templateUrl: './fotos-manager.component.html',
  styleUrls: ['./fotos-manager.component.scss'],
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonButtons, IonItem, IonList, IonLabel, IonButton, IonThumbnail, CommonModule, FotosListaComponent, GraficosComponent],
})
export class FotosManagerComponent implements OnInit{
  @Input() tipo: 'linda' | 'fea' = 'linda'; // <-- tipo recibido
  fotos: any[] = [];
  user: User | null = null;
  @ViewChild(FotosListaComponent) fotosListaComponent!: FotosListaComponent;
  

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
          const nombreArchivo = await this.storageService.uploadImage(webPath.toString(), this.user.email!, this.tipo);
          console.log('Imagen subida exitosamente a Supabase');
          if (this.fotosListaComponent) {
            await this.fotosListaComponent.cargarFotos();
          }

          if (nombreArchivo) {

            await this.fotoService.inicializarVoto(nombreArchivo, this.tipo);
          }else {
            console.error('Error: nombreArchivo es undefined');
          }
          
        }
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }; 
}

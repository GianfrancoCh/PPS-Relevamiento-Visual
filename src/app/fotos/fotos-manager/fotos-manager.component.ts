import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DatabaseService } from '../../services/supabase.service';
import { AuthService } from '../../services/auth.service';
import { IonContent, IonButtons, IonItem, IonList, IonLabel, IonButton, IonThumbnail} from "@ionic/angular/standalone";
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-fotos-manager',
  templateUrl: './fotos-manager.component.html',
  styleUrls: ['./fotos-manager.component.scss'],
  imports: [IonContent, IonButtons, IonItem, IonList, IonLabel, IonButton, IonThumbnail]
})
export class FotosManagerComponent implements OnInit {
  @Input() tipo: 'linda' | 'fea' = 'linda'; // <-- tipo recibido
  fotos: any[] = [];
  user: User | null = null;

  constructor(
    private database: DatabaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarFotos();
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log('Usuario en home:', user);
    });
  }

 // Tomar la foto
  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    // Obtener fecha actual y crear un nombre único para la foto
    const fecha = new Date().toISOString();

    // Verificar que el usuario está logueado antes de continuar
    if (!this.user || !this.user.email) {
      console.error('No se ha encontrado un usuario logueado');
      return;
    }

    // Generar un ID único para la imagen
    const imageId = `${this.user.email}-${fecha}`;

    const filePath = `fotos/${this.tipo}/${imageId}.jpg`;  // Ruta del archivo en el storage

    // Subir la imagen a Supabase Storage
    const response = await this.database.uploadImage(filePath, image.dataUrl!);

    // Comprobar si hay un error en la respuesta
    if ('error' in response) {
      console.error('Error subiendo la imagen:', response.error);
      return;
    }

    // Si no hay error, la respuesta debe tener las propiedades `id`, `path`, `fullPath`
    const downloadURL = response.fullPath;  // Aquí accedemos directamente a `fullPath`

    if (!downloadURL) {
      console.error('No se pudo obtener la URL de descarga de la imagen.');
      return;
    }

    // Guardar la información de la foto en la base de datos
    const foto = {
      url: downloadURL,
      tipo: this.tipo,
      usuario: this.user.email,  // Ahora seguro que `this.user.email` es un string
      fecha: fecha,
      votos: 0
    };

    await this.supabase.insertFoto(foto);  // Insertar en la base de datos de Supabase

    this.cargarFotos();  // Volver a cargar las fotos después de subir
  }

  // Cargar las fotos
  async cargarFotos() {
    this.fotos = await this.supabase.getFotos(this.tipo);
  }

  // Votar una foto
  async votar(foto: any) {
    await this.supabase.votarFoto(foto.id, foto.votos + 1);
  }

 
}

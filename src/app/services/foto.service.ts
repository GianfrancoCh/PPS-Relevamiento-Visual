import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor(
    private supabase: SupabaseService,
    private authService: AuthService
  ) {}

  public async addNewToGallery():Promise<String | undefined> {
    // Take a photo
    const image:Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    return image.webPath
  };

  public async inicializarVoto(nombreArchivo: string, tipo: 'linda' | 'fea') {
    // Verificar si ya existe un voto registrado para esta foto con este tipo
    const { data, error } = await this.supabase.client
      .from('fotos-votos')
      .select('nombre_foto')
      .eq('nombre_foto', nombreArchivo)
      .eq('tipo', tipo);
  
    if (error) {
      console.error('Error al verificar existencia:', error);
      return;
    }
  
    if (data.length === 0) {
      // Si no existe, insertamos un nuevo voto
      const { error: insertError } = await this.supabase.client.from('fotos-votos').upsert([
        {
          nombre_foto: nombreArchivo,
          tipo: tipo,
          votos: 0,
        },
      ]);
  
      if (insertError) {
        console.error('Error al inicializar votos:', insertError);
      } else {
        console.log('Voto inicializado para', nombreArchivo);
      }
    } else {
      console.log('Ya existe un registro para esta foto con este tipo.');
    }
  }
}

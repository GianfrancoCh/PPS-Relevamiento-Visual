import { Injectable } from '@angular/core';
import { createClient, SupabaseClient} from '@supabase/supabase-js';
import { environment } from '../../environments/environment'; 

const supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  // Método para subir una imagen
  async uploadImage(image: File, path: string): Promise<string> {
    const filePath = `images/${path}`;  // Ruta en Supabase Storage

    try {
      // Subir la imagen a Supabase Storage
      const { data, error } = await supabase.storage.from('fotos').upload(filePath, image);

      if (error) {
        throw new Error(`Error al subir la imagen: ${error.message}`);
      }

      // Obtener la URL de la imagen subida
      const { data: urlData } = supabase.storage.from('fotos').getPublicUrl(filePath);

      if (!urlData) {
        throw new Error('Error al obtener la URL pública de la imagen.');
      }

      return urlData.publicUrl;  // Devuelve la URL pública de la imagen
    } catch (error) {
      throw new Error(`Hubo un problema al subir la imagen: ${error}`);
    }
  }
}
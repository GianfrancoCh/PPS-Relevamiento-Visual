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
  // async uploadImage(pathUri: string | undefined, email: string): Promise<void> {
  //   if (!pathUri) {
  //     throw new Error('No se proporcionó la URI de la imagen.');
  //   } else {
  //     try {
  //       // Obtener la fecha actual
  //       const auxFecha: Date = new Date();
  //       const fechaString = auxFecha.toISOString(); // Para que sea un formato ISO (más estándar)
  
  //       // Crear el nombre del archivo usando el email del usuario y la fecha
  //       const nombreArchivo = `${email}_${fechaString}.jpg`; 
  
  //       // Obtener el blob de la imagen
  //       const response = await fetch(pathUri);
  //       const blob = await response.blob();
  
  //       // Subir la imagen a Supabase Storage
  //       const { data, error } = await supabase
  //         .storage
  //         .from("fotos-edificio")
  //         .upload(`fotos/${nombreArchivo}`, blob);
  
  //       if (error) {
  //         throw new Error(error.message);
  //       }
  
  //       console.log('Imagen subida exitosamente:', data);
  //     } catch (error) {
  //       console.error('Error al subir la imagen:', error);
  //     }
  //   }
  // };
  async uploadImage(pathUri: string | undefined, email: string, tipo: 'fea' | 'linda'): Promise<void> {
    if (!pathUri) {
      throw new Error('No se proporcionó la URI de la imagen.');
    }
  
    try {
      const fechaString = new Date().toISOString();
      const nombreArchivo = `${email}_${fechaString}.jpg`;
  
      const response = await fetch(pathUri);
      const blob = await response.blob();
  
      // Ruta dinámica según el tipo
      const carpetaDestino = tipo === 'fea' ? 'fotos-feas' : 'fotos-lindas';
  
      const { data, error } = await supabase.storage
        .from('fotos-edificio')
        .upload(`${carpetaDestino}/${nombreArchivo}`, blob);
  
      if (error) {
        throw new Error(error.message);
      }
  
      console.log('Imagen subida exitosamente a:', data.path);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };


}
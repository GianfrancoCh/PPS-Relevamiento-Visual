import { Injectable } from '@angular/core';
import { createClient, SupabaseClient} from '@supabase/supabase-js';
import { environment } from '../../environments/environment'; 

const supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() {}


  async uploadImage(pathUri: string | undefined, email: string, tipo: 'fea' | 'linda'): Promise<string | undefined> {
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
      return nombreArchivo ?? undefined;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return undefined;
    }
  };


}
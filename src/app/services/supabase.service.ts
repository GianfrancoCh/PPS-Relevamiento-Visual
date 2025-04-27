import { Injectable } from '@angular/core';
import { createClient,SupabaseClient, } from '@supabase/supabase-js';
import { User } from '../interfaces'
import { environment } from '../../environments/environment'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() { }

  // Obtener datos de una tabla
  async getData<T>(tableName: string, fieldOrderBy?: string): Promise<Array<T>> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*')
      .order(fieldOrderBy || 'id');  // Ordenar por el campo especificado

    if (error) {
      throw new Error(error.message);
    }

    return data as Array<T>;
  }

  // Obtener datos de un registro específico
  async getDataFromDoc<T>(tableName: string, docId: string): Promise<T> {
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*')
      .eq('id', docId)
      .single();  // Obtener un solo registro

    if (error) {
      throw new Error(error.message);
    }

    return data as T;
  }

  // Agregar datos a una tabla
  async addData(tableName: string, data: any): Promise<string> {
    const { data: insertData, error } = await this.supabase
      .from(tableName)
      .insert([data])
      .select(); // IMPORTANTE: agrega `.select()` para que Supabase devuelva el nuevo registro.
  
    if (error) {
      throw new Error('Hubo un problema al subir los datos: ' + error.message);
    }
  
    if (!insertData || insertData.length === 0) {
      throw new Error('No se recibió el nuevo dato insertado.');
    }
  
    return insertData[0].id; // Ahora sí es seguro acceder
  }

  // Actualizar datos de un registro
  async updateDoc(tableName: string, docId: string, data: any): Promise<void> {
    const { error } = await this.supabase
      .from(tableName)
      .update(data)
      .eq('id', docId);

    if (error) {
      throw new Error('Hubo un problema al actualizar los datos: ' + error.message);
    }
  }

  // Escuchar cambios en la tabla
  // listenColChanges<T extends { id: string }>(
  //   tableName: string,
  //   arrayPointer: Array<T>,
  //   filterFunc?: (item: T) => boolean,
  //   sortFunc?: (a: T, b: T) => number,
  //   transform?: (item: T) => Promise<T>
  // ) {
  //   const channel = this.supabase
  //     .from(tableName)
  //     .on('*', async (payload: SupabaseRealtimePayload<T>) => {
  //       const newData = transform ? await transform(payload.new) : payload.new;
  //       if (!filterFunc || filterFunc(newData)) {
  //         if (payload.eventType === 'INSERT') {
  //           arrayPointer.push(newData);
  //         } else {
  //           const index = arrayPointer.findIndex(t => t.id === newData.id);
  //           if (payload.eventType === 'UPDATE') {
  //             arrayPointer[index] = newData;
  //           } else if (payload.eventType === 'DELETE') {
  //             arrayPointer.splice(index, 1);
  //           }
  //         }
  //       }
  
  //       if (sortFunc) {
  //         arrayPointer.sort(sortFunc);
  //       }
  //     })
  //     .subscribe();
  
  //   return channel;
  // }

  // Buscar usuario por email
  async searchUserByEmail(email: string): Promise<User> {
    const { data: users, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (error) {
      throw new Error('Hubo un problema al buscar el usuario: ' + error.message);
    }

    if (users.length === 0) {
      throw new Error('Esta dirección de correo no está registrada.');
    }

    return users[0] as User;
  }
}

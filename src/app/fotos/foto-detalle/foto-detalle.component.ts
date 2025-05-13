import { Component, OnInit } from '@angular/core';
import { FotoDetalleService } from 'src/app/services/foto-detalle.service';
import { CommonModule } from '@angular/common';
import { IonCard, IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from "@ionic/angular/standalone";
import { SupabaseService } from 'src/app/services/supabase.service'; // Asegúrate de que la ruta sea correcta
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-foto-detalle',
  templateUrl: './foto-detalle.component.html',
  styleUrls: ['./foto-detalle.component.scss'],
  imports: [IonContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonCard, CommonModule, IonButton],
})
export class FotoDetalleComponent implements OnInit {
  foto: any = null;
  votado: boolean = false;
  

  constructor(private detalleService: FotoDetalleService, private supabaseService : SupabaseService, private navCtrl:NavController) {}

  async ngOnInit() {
    this.foto = this.detalleService.getFotoData();
    console.log('Foto recibida:', this.foto);
  
    if (this.foto?.nombre) {
      await this.verificarSiYaVoto();
      console.log('Votado:', this.votado);
    }
  }

  async verificarSiYaVoto() {
    const { data: { user }, error: authError } = await this.supabaseService.client.auth.getUser();
    console.log('Usuario autenticado:', user);
    if(user){
      console.log('ID de usuario:', user.id);
    }

    if (authError || !user) {
      console.error('Usuario no autenticado');
      this.votado = false;
      return;
    }
  
    const { data, error } = await this.supabaseService.client
      .from('votos_usuarios')
      .select('*')
      .eq('user_id', user.id)
      .eq('nombre_foto', this.foto.nombre)
      .maybeSingle();
  
    if (error) {
      console.error('Error al verificar voto:', error);
      this.votado = false;
    } else {
      this.votado = !!data; // true si ya votó, false si no
    }

    console.log('Datos de verificación de voto:', data);

    console.log('Voto verificado:', this.votado);
  };

  async votar() {
    try {
      const { data: { user }, error: authError } = await this.supabaseService.client.auth.getUser();
  
      if (authError || !user) {
        console.error('Usuario no autenticado');
        return;
      }
  
      // Intentar registrar el voto del usuario
      const { error: votoError } = await this.supabaseService.client
        .from('votos_usuarios')
        .insert({
          user_id: user.id,
          nombre_foto: this.foto.nombre,
          tipo: this.foto.tipo,
        });
  
      if (votoError) {
        if (votoError.code === '23505') {  // Violación de restricción única
          console.log('Ya votaste esta foto.');
          return;
        }
        throw votoError;
      }
  
      // Incrementar el voto solo si el insert fue exitoso
      const resultado = await this.supabaseService.incrementarVoto(this.foto.nombre, this.foto.tipo);
      if (resultado) {
          console.log('Voto registrado correctamente');

          await this.verificarSiYaVoto();

          // Actualizar número de votos desde la base de datos
          const { data: nuevaFoto, error: fotoError } = await this.supabaseService.client
            .from('fotos-votos')
            .select('*')
            .eq('nombre_foto', this.foto.nombre)
            .maybeSingle();

          if (!fotoError && nuevaFoto) {
            this.foto.votos = nuevaFoto.votos;
          }
      }
  
    } catch (error) {
      console.error('Error al votar:', error);
    }
  }

  volverAtras() {
    this.navCtrl.navigateBack('home');
  }

}
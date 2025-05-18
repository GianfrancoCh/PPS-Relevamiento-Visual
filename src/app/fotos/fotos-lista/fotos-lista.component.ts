import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FotoDetalleService } from 'src/app/services/foto-detalle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotos-lista',
  templateUrl: './fotos-lista.component.html',
  styleUrls: ['./fotos-lista.component.scss'],
  imports: [IonCard, IonCardContent, IonButton, IonItem, IonList, IonLabel, IonThumbnail, CommonModule],
})
export class FotosListaComponent  implements OnInit {
  @Input() tipo: 'fea' | 'linda' = 'fea';
  fotos: { url: string, nombre: string }[] = [];

  constructor(private supabase: SupabaseService, private fotoDetalleService:FotoDetalleService, private router : Router) {}

  ngOnInit() {
    this.cargarFotos();
  }

  async cargarFotos() {
    const carpeta = this.tipo === 'fea' ? 'fotos-feas' : 'fotos-lindas';
  
    const { data, error } = await this.supabase.listFilesFromFolder('fotos-edificio', carpeta);
  
    if (error) {
      console.error('Error al listar fotos:', error);
    } else {
      
      this.fotos = data
      .filter(f => f.name !== '.emptyFolderPlaceholder')
      .map(f => ({
        url: this.supabase.getPublicUrl('fotos-edificio', `${carpeta}/${f.name}`),
        nombre: f.name
      }))
      .sort((a, b) => {
        const fechaA = this.extraerFecha(a.nombre);
        const fechaB = this.extraerFecha(b.nombre);

        if (!fechaA && !fechaB) return 0;
        if (!fechaA) return 1;
        if (!fechaB) return -1;

        return fechaB.getTime() - fechaA.getTime();
      });
    }
  };
  
  getNombreUsuarioDesdePath(fotoUrl: string): string {
    const partes = fotoUrl.split('/');
    const nombreArchivo = partes[partes.length - 1];
    const email = nombreArchivo.split('_')[0];
    return email.split('@')[0];
  };

  obtenerNombreUsuario(nombreArchivo: string): string {
    const email = nombreArchivo.split('_')[0];
    return email.split('@')[0];
  };

  obtenerFechaDesdeNombre(nombreArchivo: string): string {
    const partes = nombreArchivo.split('_');
    if (partes.length < 2) return 'Fecha desconocida';
  
    const fechaISO = partes[1].replace('.jpg', '');
    const fecha = new Date(fechaISO);
  
    // Podés personalizar el formato como quieras
    return fecha.toLocaleString(); // Ej: "12/5/2025, 14:42:52"
  };

  private extraerFecha(nombreArchivo: string): Date | null {
    const partes = nombreArchivo.split('_');
    if (partes.length < 2) return null;

    const fechaStr = partes[1].replace('.jpg', '').trim();
    const fecha = new Date(fechaStr);

    return isNaN(fecha.getTime()) ? null : fecha;
  }

  async verDetalle(foto: { nombre: string; url: string }) {
    
    try {
      const votos = await this.supabase.getVotos(foto.nombre);  // Espera a que la promesa se resuelva
      console.log(votos);
  
      this.fotoDetalleService.setFotoData({
        nombre: foto.nombre,
        url: foto.url,
        tipo: this.tipo,
        votos: votos  // Pasar los votos a los datos de la foto
      });
  
      this.router.navigate(['/foto-detalle']);
    } catch (error) {
      console.error('Error al obtener los votos:', error);
    }
  };

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotosFeasPage } from './fotos-feas/fotos-feas.page';
import { FotosLindasPage } from './fotos-lindas/fotos-lindas.page';
import { FotosPageRoutingModule } from './fotos-routing.module';
import { FotosManagerComponent } from './fotos-manager/fotos-manager.component';
import { FotosListaComponent } from './fotos-lista/fotos-lista.component';
import { FotoDetalleComponent } from './foto-detalle/foto-detalle.component';
import { GraficosComponent } from './graficos/graficos.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FotosPageRoutingModule,
    FotosManagerComponent,
    FotosFeasPage,
    FotosLindasPage,
    FotosListaComponent,
    FotoDetalleComponent,
    GraficosComponent
  ],
  exports: [FotosManagerComponent], // Asegúrate de exportar el componente FotosManager
})
export class FotosModule { }
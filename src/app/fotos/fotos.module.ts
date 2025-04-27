import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotosFeasPage } from './fotos-feas/fotos-feas.page';
import { FotosLindasPage } from './fotos-lindas/fotos-lindas.page';
import { FotosPageRoutingModule } from './fotos-routing.module';
import { FotosManagerComponent } from './fotos-manager/fotos-manager.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FotosPageRoutingModule,
    FotosManagerComponent,
    FotosFeasPage,
    FotosLindasPage
  ],
  exports: [FotosManagerComponent], // Asegúrate de exportar el componente FotosManager
})
export class FotosModule { }
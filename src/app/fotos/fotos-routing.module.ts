import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosPage } from './fotos.page';
import { FotosLindasPage } from './fotos-lindas/fotos-lindas.page';
import { FotosFeasPage } from './fotos-feas/fotos-feas.page';

const routes: Routes = [
  {
    path: '',
    component: FotosPage
  },
  {
    path: 'lindas',
    component: FotosLindasPage
  },
  {
    path: 'feas',
    component: FotosFeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosPageRoutingModule {}
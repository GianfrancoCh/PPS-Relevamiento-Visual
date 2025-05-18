import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'fotos-feas',
    loadComponent: () => import('./fotos/fotos-feas/fotos-feas.page').then( m => m.FotosFeasPage)
  },
  {
    path: 'fotos-lindas',
    loadComponent: () => import('./fotos/fotos-lindas/fotos-lindas.page').then( m => m.FotosLindasPage)
  },
  {
    path: 'fotos',
    loadChildren: () => import('./fotos/fotos-routing.module').then(m => m.FotosPageRoutingModule)
  },
  {
    path: 'foto-detalle',
    loadComponent: () => import('./fotos/foto-detalle/foto-detalle.component').then( m => m.FotoDetalleComponent)
  },
  {
    path: 'grafico',
    loadComponent: () => import('./grafico/grafico.page').then( m => m.GraficoPage)
  }
];

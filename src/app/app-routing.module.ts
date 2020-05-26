import { CursosPresencialesComponent } from './components/cursos/cursos-presenciales/cursos-presenciales.component';
import { CursosOnlineComponent } from './components/cursos/cursos-online/cursos-online.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SuscripcionComponent } from './components/user-profile/suscripcion/suscripcion.component';
import { CursosGratisComponent } from './components/cursos/cursos-gratis/cursos-gratis.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'suscripcion',
    component: SuscripcionComponent
  },
  {
    path: 'cursos-online',
    component: CursosOnlineComponent
  },
  {
    path: 'cursos-presenciales',
    component: CursosPresencialesComponent
  },
  {
    path: 'clases-gratis',
    component: CursosGratisComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

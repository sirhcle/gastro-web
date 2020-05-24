import { CursosPresencialesComponent } from './components/cursos/cursos-presenciales/cursos-presenciales.component';
import { CursosOnlineComponent } from './components/cursos/cursos-online/cursos-online.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MiPlanComponent } from './components/user-profile/mi-plan/mi-plan.component';


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
    path: 'mi-plan',
    component: MiPlanComponent
  },
  {
    path: 'cursos-online',
    component: CursosOnlineComponent
  },
  {
    path: 'cursos-presenciales',
    component: CursosPresencialesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CursosPresencialesComponent } from './components/cursos/cursos-presenciales/cursos-presenciales.component';
import { CursosOnlineComponent } from './components/cursos/cursos-online/cursos-online.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SuscripcionComponent } from './components/user-profile/suscripcion/suscripcion.component';
import { CursosGratisComponent } from './components/cursos/cursos-gratis/cursos-gratis.component';
import { EditarPerfilRoutes } from './editar-perfil-routing';
import { ProductsListComponent } from './components/tienda/products-list/products-list.component';
import { ProductDetailsComponent } from './components/tienda/product-details/product-details.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';


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
   ...EditarPerfilRoutes, // se incluye el archivo de rutas espec�ficas para esta secci�n
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
  },
  {
    path: 'store',
    component: ProductsListComponent
  },
  {
    path: 'product-details/:productId',
    component: ProductDetailsComponent
  },
  {
    path: 'product-details/:productId',
    component: ProductDetailsComponent
  },
  {
    path: 'nosotros',
    component: NosotrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

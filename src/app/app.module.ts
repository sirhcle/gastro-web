import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccordionComponent } from './components/home/accordion/accordion.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/modals/login/login.component';
import { RegisterComponent } from './components/modals/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuscripcionComponent } from './components/user-profile/suscripcion/suscripcion.component';
import { CursosOnlineComponent } from './components/cursos/cursos-online/cursos-online.component';
import { CursosPresencialesComponent } from './components/cursos/cursos-presenciales/cursos-presenciales.component';
import { NguCarouselModule } from '@ngu/carousel';
import { EditarPerfilComponent} from './components/user-profile/editar-perfil/editar-perfil.component';
import { PerfilComponent } from './components/user-profile/editar-perfil/perfil/perfil.component';
import { MiPlanDetComponent } from './components/user-profile/editar-perfil/miplandet/miplandet.component';
import { MisComprasComponent } from './components/user-profile/editar-perfil/mis-compras/mis-compras.component';
import { MisDireccionesComponent} from './components/user-profile/editar-perfil/misdirecciones/misdirecciones.component';



import { CarruselVideosComponent } from './components/cursos/cursos-online/carrusel-videos/carrusel-videos.component';
import { PagoSuscripcionComponent } from './components/modals/pago-suscripcion/pago-suscripcion.component';
import { CursosGratisComponent } from './components/cursos/cursos-gratis/cursos-gratis.component';
import { ProductsListComponent } from './components/tienda/products-list/products-list.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { SideNavComponent } from './components/user-profile/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ProductDetailsComponent } from './components/tienda/product-details/product-details.component';
import { FastRegisterComponent } from './components/modals/fast-register/fast-register.component';

// import {  } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
<<<<<<< HEAD
import { SelectPagoComponent } from './components/modals/select-pago/select-pago.component';
import { DatosTarjetaCreditoComponent } from './components/modals/datos-tarjeta-credito/datos-tarjeta-credito.component';
import { DatosTiendaConvenienciaComponent } from './components/modals/datos-tienda-conveniencia/datos-tienda-conveniencia.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { InfoChefComponent } from './components/modals/info-chef/info-chef.component';
import { SolicitaInformacionComponent } from './components/modals/solicita-informacion/solicita-informacion.component';
=======
>>>>>>> 86c2efd638cae90cd92f40e7b979ac94dfb23850
// import { SafePipePipe } from './pipes/safe-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AccordionComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    SuscripcionComponent,
    CursosOnlineComponent,
    CursosPresencialesComponent,
    EditarPerfilComponent,
    PerfilComponent,
    MiPlanDetComponent,
    MisComprasComponent,
    MisDireccionesComponent,
    CarruselVideosComponent,
    PagoSuscripcionComponent,
    CursosGratisComponent,
    ProductsListComponent,
    SideNavComponent,
    ProductDetailsComponent,
<<<<<<< HEAD
    FastRegisterComponent,
    SelectPagoComponent,
    DatosTarjetaCreditoComponent,
    DatosTiendaConvenienciaComponent,
    NosotrosComponent,
    InfoChefComponent,
    SolicitaInformacionComponent
=======
    FastRegisterComponent
>>>>>>> 86c2efd638cae90cd92f40e7b979ac94dfb23850
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NguCarouselModule,
    NgxMasonryModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

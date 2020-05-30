import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NguCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../modals/login/login.component';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterComponent } from '../modals/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData: any;
  constructor(private modalService: NgbModal, private router: Router, private spinner: NgxSpinnerService ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
         // scroll to top
         window.scrollTo(0, 0);
      }
   });
  }

  ngOnInit(): void {
    const locStorage = localStorage.getItem('userData');
    this.userData = JSON.parse(locStorage);
    // console.log("hola->" + this.userData);
  }

  openLogin(){
    this.modalService.open(LoginComponent);
  }

  openRegister() {
    this.modalService.open(RegisterComponent);
  }

  openMisCompras() {
    this.router.navigate(['/editar-perfil/miscompras']).then( () => {
      window.location.reload();
    });
  }

  openMiPlan() {
    this.router.navigate(['/editar-perfil/miplandet']).then( () => {
      window.location.reload();
    });
  }

  openEditarPerfil() {
    this.router.navigate(['/editar-perfil/perfil']).then( () => {
      window.location.reload();
    });
  }

  closeSesssion() {
    localStorage.removeItem('userData');
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/home']).then( () => {
        window.location.reload();
      });
      // window.location.reload();
    }, 3000);
  }

  goHome() {
    this.router.navigate(['/home']).then( () => {
      window.location.reload();
    });
  }
  
  openSuscripcion() {
    this.router.navigate(['/suscripcion']).then( () => {
      window.location.reload();
    });
  }

  openCursosOnline() {
    this.router.navigate(['/cursos-online']).then( () => {
      window.location.reload();
    });
  }

  openCursosPresenciales() {
    this.router.navigate(['/cursos-presenciales']).then( () => {
      window.location.reload();
    });
  }

  openClasesGratis() {
    this.router.navigate(['/clases-gratis']).then( () => {
      window.location.reload();
    });
  }

  openStore() {
    this.router.navigate(['/store']).then( () => {
      window.location.reload();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../modals/login/login.component';
import { Router } from '@angular/router';
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
    this.router.navigate(['/editar-perfil/miscompras']);
  }

  openMiPlan() {
    this.router.navigate(['/editar-perfil/miplandet']);
  }

  openEditarPerfil() {
    this.router.navigate(['/editar-perfil/perfil']);
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
    this.router.navigate(['/home']);
  }

  openSuscripcion() {
    this.router.navigate(['/suscripcion']);
  }

  openCursosOnline() {
    this.router.navigate(['/cursos-online']);
  }

  openCursosPresenciales() {
    this.router.navigate(['/cursos-presenciales']);
  }

  openClasesGratis() {
    this.router.navigate(['/clases-gratis']);
  }

  openStore() {
    this.router.navigate(['/store']);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../modals/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData: any;
  constructor(private modalService: NgbModal, private router: Router ) {
    const locStorage = localStorage.getItem('userData');
    this.userData = JSON.parse(locStorage);
  }

  ngOnInit(): void {
  }

  openLogin(){
    this.modalService.open(LoginComponent);
  }

  openMiPlan() {
    // this.router.navigate(['/mi-plan']);
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

}

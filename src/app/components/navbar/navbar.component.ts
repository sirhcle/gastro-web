import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../modals/login/login.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData: any;
  constructor(private modalService: NgbModal, private router: Router, private spinner: NgxSpinnerService ) {
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

  closeSesssion() {
    localStorage.removeItem('userData');
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.router.navigate(['/home']);
      // window.location.reload();
    }, 5000);
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

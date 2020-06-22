import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

import { RegisterComponent } from './../register/register.component';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private spinner: NgxSpinnerService, private router: Router, private _loginService: LoginService) {

    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

  }

  ngOnInit(): void {
  }

  openRegister() {
    this.modalService.open(RegisterComponent);
  }

  doLogin() {

    // console.log(this.loginForm);
    // console.log(this.loginForm.value);
    // console.log(this.loginForm.value.username);
    this.spinner.show();

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this._loginService.doLogin(username, password)
      .subscribe((resp: any) => {
        // console.log(resp.idUsuario);
        const obUsuario = {
          username: this.loginForm.value.username,
          idUsuario: resp.idUsuario,
          isLogin: true
        };

        this.spinner.hide();
        localStorage.setItem('userData', JSON.stringify(obUsuario));
        this.activeModal.close();
        this.router.navigate(['/cursos-online']).then( () => {
          window.location.reload();
        });
      });

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */


    // }, 5000);
  }

}

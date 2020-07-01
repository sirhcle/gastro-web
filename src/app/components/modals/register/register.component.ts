import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() public isFromLogin = false;


  registerForm: FormGroup;
  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private _registerService: LoginService,
              private spinner: NgxSpinnerService,
              private router: Router) {

    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    console.log(this.isFromLogin);
  }

  doRegister() {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;
    const password2 = this.registerForm.value.password2;
    const email = this.registerForm.value.email;

    if (password !== password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this._registerService.postCreateUser(username, password, email)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.status === 1) {
          alert(resp.error);
        } else {
          const obUsuario = {
            username: this.registerForm.value.username,
            idUsuario: resp.idUsuario,
            isLogin: true
          };

          this.spinner.hide();
          localStorage.setItem('userData', JSON.stringify(obUsuario));
          this.activeModal.close();
          this.router.navigate(['/cursos-online']).then(() => {
            window.location.reload();
          });
        }
      });
  }

  openLoginModal(){
    this.modalService.open(LoginComponent);
    this.activeModal.close();
  }

}



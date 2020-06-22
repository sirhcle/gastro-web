import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private _registerService: LoginService, private spinner: NgxSpinnerService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      password2: new FormControl()
    });
  }

  ngOnInit(): void {
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

}

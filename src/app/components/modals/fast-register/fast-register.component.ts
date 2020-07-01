import { Component, OnInit } from '@angular/core';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fast-register',
  templateUrl: './fast-register.component.html',
  styleUrls: ['./fast-register.component.scss']
})
export class FastRegisterComponent implements OnInit {
  
  public onClose: Subject<boolean>;
  registerForm: FormGroup;
  
  constructor(public bsModalRef: BsModalRef,
              private _service: LoginService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.onClose = new Subject();

    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required)
    });
  }

  onCloseModal(){
    this.bsModalRef.hide();
  }

  public onConfirm(): void {

    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;
    const email = this.registerForm.value.email;

    // console.log(this.registerForm);
    // return;
    
    this._service.postCreateUser(username, password, email)
        .subscribe((resp: any) => {
          if (resp.status === 1) {
            alert(resp.error);
            this.onClose.next(false);
            this.bsModalRef.hide();
          } else {
            const obUsuario = {
              username: this.registerForm.value.username,
              idUsuario: resp.idUsuario,
              isLogin: true
            };

            this.spinner.hide();
            localStorage.setItem('userData', JSON.stringify(obUsuario));
            this.onClose.next(true);
            this.bsModalRef.hide();
          }
        });
  }

}

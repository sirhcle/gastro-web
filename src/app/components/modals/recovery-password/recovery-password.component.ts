import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

  // public onClose: Subject<string>;
  txtEmail = '';

  constructor(private _service: LoginService) { }

  ngOnInit(): void {
    // this.onClose = new Subject();
  }

  public onConfirm(): void {
    // this.bsModalRef.hide();
  }

  recuperaPassword() {
    // this.onClose.next('llamada');
    // this.bsModalRef.hide();
    this._service.postResetPassword(this.txtEmail)
        .subscribe((resp: any) => {
          console.log(resp);
          if (resp.status === 0) {
            alert('Tu contraseña ha sido restaurada, por favor verifica tu correo');
          } else {
            alert(resp.error);
          }
        });
  }

  saverange(newValue) {
    this.txtEmail = newValue;
    // console.log(this.txtEmail);
  } 

}

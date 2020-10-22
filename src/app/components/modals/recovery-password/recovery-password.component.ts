import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

  // bsModalRef: BsModalRef;

  public onClose: Subject<string>;
  txtEmail = '';

  constructor(private _service: LoginService, private bsModalRef: BsModalRef, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }

  recuperaPassword() {
    this.spinner.show();
    this._service.postResetPassword(this.txtEmail)
        .subscribe((resp: any) => {
          // console.log(resp);
          this.spinner.hide();
          if (resp.status === 0) {
            // alert('Tu contraseña ha sido restaurada, por favor verifica tu correo');
            swal('', 'Tu contraseña ha sido restaurada, por favor verifica tu correo', 'success');
            this.bsModalRef.hide();
          } else {
            // alert(resp.error);
            swal('', resp.error, 'error');
          }
        });
  }

  saverange(newValue) {
    this.txtEmail = newValue;
    // console.log(this.txtEmail);
  } 

}

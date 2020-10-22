import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { OpenpayService } from 'src/app/services/openpay/openpay.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-datos-tarjeta-credito',
  templateUrl: './datos-tarjeta-credito.component.html',
  styleUrls: ['./datos-tarjeta-credito.component.scss']
})
export class DatosTarjetaCreditoComponent implements OnInit {

  email = '';
  username = '';
  fechaExpira = '';
  cvv = '';
  ccnumber = '';

  cantidad: any;
  concepto: string;

  public onClose: Subject<string>;
  constructor(public bsModalRef: BsModalRef,
              private _openPayService: OpenpayService,
              private spinner: NgxSpinnerService,
              private _service: SuscripcionService,
              private router: Router) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }
  addSlash(expDate){
    console.log(expDate);
  }

  public pagar(){
    
    this.ccnumber = this.ccnumber.replace(/\s/g, '');
    this.fechaExpira = this.fechaExpira.replace(/\s/g, '');
    // return;
    this.spinner.show();
    this._openPayService.openPayTraeSuscriptores()
        .subscribe((resp: any) => {
          // console.log(resp);
          let hasSuscription = false;

          for (const suscripcion of resp){
            if (suscripcion.email === this.email) {
              // tslint:disable-next-line:max-line-length
              this._openPayService.openPayCreaSuscripcion(suscripcion.id, this.ccnumber, this.username, this.fechaExpira, this.cvv, this.concepto)
                  .subscribe((respData: any) => {
                    this.spinner.hide();
                    swal('', 'Pago realizado correctamente', 'success').then((value: any) => {
                      this.pagoExitoso();
                    });

                  }, (error: any) => {
                    this.spinner.hide();
                    swal('', 'Ocurrió un error al procesar su pago', 'error');
                  });
              hasSuscription = true;
              break;
            }
          }

          if (!hasSuscription) {
            this._openPayService.openPayCrearCliente(this.username, this.email)
                .subscribe((respCliente: any) => {
                  // tslint:disable-next-line:max-line-length
                  this._openPayService.openPayCreaSuscripcion(respCliente.id, this.ccnumber, this.username, this.fechaExpira, this.cvv, this.concepto)
                      .subscribe((respDataSusc: any) => {
                        this.spinner.hide();
                        swal('', 'Pago realizado correctamente', 'success').then((value: any) => {
                          this.pagoExitoso();
                        });
                        this.pagoExitoso();
                      });
                }, (error: any) => {
                  this.spinner.hide();
                  swal('', 'Ocurrió un error al procesar su pago', 'error');
                });
          }
        });
  }

  pagoExitoso() {

    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    const idUsuario = userData.idUsuario;
    let idSuscripcion = 1;

    if (this.concepto === 'premium') {
      idSuscripcion = 2;
    } else if (this.concepto === 'golden') {
      idSuscripcion = 3;
    }


    this._service.postSuscripcion(idUsuario, idSuscripcion, 2)
      .subscribe((resp: any) => {
        this.router.navigate(['/cursos-online']).then(() => {
          this.bsModalRef.hide();
          window.location.reload();
        });
      });
  }
  
  // paymentTarjeta(){
  //   this.onClose.next('tarjeta');
  //   this.bsModalRef.hide();
  // }

}

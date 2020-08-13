import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { OpenpayService } from 'src/app/services/openpay/openpay.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  public onClose: Subject<string>;
  constructor(public bsModalRef: BsModalRef,
              private _openPayService: OpenpayService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }

  public pagar(){
    // console.log(this.email);
    this.spinner.show();
    this._openPayService.openPayTraeSuscriptores()
        .subscribe((resp: any) => {
          // console.log(resp);
          let hasSuscription = false;

          for (const suscripcion of resp){
            if (suscripcion.email === this.email) {
              console.log('cliente existente');
              this._openPayService.openPayCreaSuscripcion(suscripcion.id)
                  .subscribe((respData: any) => {
                    // console.log(respData);
                    // console.log('suscrito');
                    this.spinner.hide();
                    alert('pago realizado');
                  });
              hasSuscription = true;
              break;
            }
          }

          if (!hasSuscription) {
            console.log('no es cliente');
            this._openPayService.openPayCrearCliente(this.username, this.email)
                .subscribe((respCliente: any) => {
                  // console.log(respCliente);
                  // console.log('cliente registrado');
                  this._openPayService.openPayCreaSuscripcion(respCliente.id)
                      .subscribe((respDataSusc: any) => {
                        // console.log('suscripcion exito o no?');
                        // console.log(respDataSusc);
                        this.spinner.hide();
                        alert('pago realizado');
                      });
                });
          }
        });
  }
  
  // paymentTarjeta(){
  //   this.onClose.next('tarjeta');
  //   this.bsModalRef.hide();
  // }

}

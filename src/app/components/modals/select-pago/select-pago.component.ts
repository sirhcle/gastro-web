import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-pago',
  templateUrl: './select-pago.component.html',
  styleUrls: ['./select-pago.component.scss']
})
export class SelectPagoComponent implements OnInit {

  public onClose: Subject<string>;
  public payPalConfig: IPayPalConfig;

  cantidad: any;
  concepto: any;

  constructor(public bsModalRef: BsModalRef,
              private _service: SuscripcionService,
              private router: Router) {
    this.initConfig();
  }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }

  paymentTarjeta() {
    this.onClose.next('tarjeta');
    this.bsModalRef.hide();
  }

  paymentPaypal() {
    this.onClose.next('paypal');
    this.bsModalRef.hide();
  }

  paymentEfectivo() {
    this.onClose.next('efectivo');
    this.bsModalRef.hide();
  }

  paymentOxxo() {
    this.onClose.next('oxxo');
    this.bsModalRef.hide();
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


    this._service.postSuscripcion(idUsuario, idSuscripcion)
        .subscribe((resp: any) => {
          this.router.navigate(['/cursos-online']).then( () => {
            this.bsModalRef.hide();
            window.location.reload();
          });
        });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AXyhsj1weGYX3VtPJfEB9fvfIlGlXOsJsa4J_sL5kDehQmsHq1_SHp-ovWYrq1v4JuWZ3p3zFCJ9K9xw',
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.cantidad,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.cantidad
              }
            }
          },
          items: [{
            name: this.concepto,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: this.cantidad,
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          if (details.status === 'APPROVED'){
            alert('Transacción aprobada');
            this.pagoExitoso();
          } else {
            alert(details.status);
          }
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }


}

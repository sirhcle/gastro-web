import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-select-pago',
  templateUrl: './select-pago.component.html',
  styleUrls: ['./select-pago.component.scss']
})
export class SelectPagoComponent implements OnInit {

  public onClose: Subject<string>;
  public payPalConfig: IPayPalConfig;

  constructor(public bsModalRef: BsModalRef) {
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

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'Aa-yqpPq0bPFn_NiSXxBttcokmBPnmKTkpkHWUpsI3JJLoc4czAWRHjIMtJIya6CgKLgMBnT4bBfeY-x',
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'MXN',
              value: '9.99',
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

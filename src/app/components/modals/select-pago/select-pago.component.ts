import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-select-pago',
  templateUrl: './select-pago.component.html',
  styleUrls: ['./select-pago.component.scss']
})
export class SelectPagoComponent implements OnInit {

  public onClose: Subject<string>;
  constructor(public bsModalRef: BsModalRef) { }

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
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagoSuscripcionComponent } from '../../modals/pago-suscripcion/pago-suscripcion.component';
import { FastRegisterComponent } from '../../modals/fast-register/fast-register.component';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-mi-plan',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.scss']
})
export class SuscripcionComponent implements OnInit {

  public modalRef: BsModalRef;

  constructor(/*private modalService: NgbModal*/private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  showPaymentOptions() {
    // this.modalService.open(PagoSuscripcionComponent, { size: 'lg' });
  }

  openFastRegister() {
    // this.modalService.open(FastRegisterComponent);
    this.modalRef = this.modalService.show(FastRegisterComponent);
    this.modalRef.content.onClose.subscribe(result => {
      console.log('result->' + result);
    });
  }

}

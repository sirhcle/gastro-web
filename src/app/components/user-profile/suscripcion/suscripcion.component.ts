import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagoSuscripcionComponent } from '../../modals/pago-suscripcion/pago-suscripcion.component';
import { FastRegisterComponent } from '../../modals/fast-register/fast-register.component';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectPagoComponent } from '../../modals/select-pago/select-pago.component';
import { DatosTarjetaCreditoComponent } from '../../modals/datos-tarjeta-credito/datos-tarjeta-credito.component';
import { DatosTiendaConvenienciaComponent } from '../../modals/datos-tienda-conveniencia/datos-tienda-conveniencia.component';


// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-mi-plan',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.scss']
})
export class SuscripcionComponent implements OnInit {

  public modalRef: BsModalRef;
  userData: any;

  constructor(/*private modalService: NgbModal*/private modalService: BsModalService) {}

  ngOnInit(): void {
    const locStorage = localStorage.getItem('userData');
    this.userData = JSON.parse(locStorage);
  }


  showPaymentOptions() {
    // this.modalService.open(PagoSuscripcionComponent, { size: 'lg' });
  }

  openPayment(monto, tipoMembresia) {
    this.openTipoPago(monto, tipoMembresia);
  }

  openFastRegister(monto, tipoMembresia) {
    // this.modalService.open();

    this.modalRef = this.modalService.show(FastRegisterComponent);
    this.modalRef.content.onClose.subscribe(result => {
      // console.log('result->' + result);
      if (result)
      {
        this.openTipoPago(monto, tipoMembresia);
      }
    });
  }

  openTipoPago(monto, tipoMembresia) {

    const initialState = {
      cantidad: monto,
      concepto: tipoMembresia
  };

    this.modalRef = this.modalService.show(SelectPagoComponent, {initialState});


    this.modalRef.content.onClose.subscribe(result => {
      switch (result) {
        case 'tarjeta':
          console.log(initialState);
          this.modalRef = this.modalService.show(DatosTarjetaCreditoComponent, { class: 'modal-lg', initialState });
          break;

        case 'paypal':
          // console.log(result);
          alert('próxiamente disponible');
          break;

        case 'efectivo':
          this.modalRef = this.modalService.show(DatosTiendaConvenienciaComponent);
          break;

        case 'oxxo':
          alert('próxiamente disponible');
          break;

        default:
          break;
      }
    });
  }

}

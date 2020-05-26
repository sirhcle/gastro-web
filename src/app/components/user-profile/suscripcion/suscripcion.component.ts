import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagoSuscripcionComponent } from '../../modals/pago-suscripcion/pago-suscripcion.component';

@Component({
  selector: 'app-mi-plan',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.scss']
})
export class SuscripcionComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  showPaymentOptions() {
    this.modalService.open(PagoSuscripcionComponent, { size: 'lg' });
  }

}

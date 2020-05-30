import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-pago-suscripcion',
  templateUrl: './pago-suscripcion.component.html',
  styleUrls: ['./pago-suscripcion.component.scss']
})
export class PagoSuscripcionComponent implements OnInit {

  paymentForm: FormGroup;
  
  constructor(public activeModal: NgbActiveModal) {
    this.paymentForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
   }

  ngOnInit(): void {
  }

}

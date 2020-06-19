import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datos-tarjeta-credito',
  templateUrl: './datos-tarjeta-credito.component.html',
  styleUrls: ['./datos-tarjeta-credito.component.scss']
})
export class DatosTarjetaCreditoComponent implements OnInit {

  public onClose: Subject<string>;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }

  // paymentTarjeta(){
  //   this.onClose.next('tarjeta');
  //   this.bsModalRef.hide();
  // }

}

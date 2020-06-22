import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-solicita-informacion',
  templateUrl: './solicita-informacion.component.html',
  styleUrls: ['./solicita-informacion.component.scss']
})
export class SolicitaInformacionComponent implements OnInit {

  public onClose: Subject<string>;
  constructor(public bsModalRef: BsModalRef) { }

  modalPhone = false;
  modalThanks = false;
  modalCongrats = false;

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }

  solicitaLlamada() {
    this.onClose.next('llamada');
    this.bsModalRef.hide();
  }

}

import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datos-tienda-conveniencia',
  templateUrl: './datos-tienda-conveniencia.component.html',
  styleUrls: ['./datos-tienda-conveniencia.component.scss']
})
export class DatosTiendaConvenienciaComponent implements OnInit {

  public onClose: Subject<string>;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }

}

import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modales-curso-presencial',
  templateUrl: './modales-curso-presencial.component.html',
  styleUrls: ['./modales-curso-presencial.component.scss']
})
export class ModalesCursoPresencialComponent implements OnInit {

  public onClose: Subject<string>;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }

}

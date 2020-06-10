import { Component, OnInit } from '@angular/core';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fast-register',
  templateUrl: './fast-register.component.html',
  styleUrls: ['./fast-register.component.scss']
})
export class FastRegisterComponent implements OnInit {
  
  public onClose: Subject<boolean>;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

}

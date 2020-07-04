import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { InfoChefComponent } from '../modals/info-chef/info-chef.component';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {
  
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }


  ngOnInit(): void {}

  openModal(idChef) {

    const initialState = {
      idNosotros: idChef
    };

    this.modalRef = this.modalService.show(InfoChefComponent, {initialState});
  }

}

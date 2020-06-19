import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoChefComponent } from '../modals/info-chef/info-chef.component';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {
  
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }


  ngOnInit(): void {
  }

  openModal(){
    // alert("hola")
    this.modalRef = this.modalService.show(InfoChefComponent, {class: 'modal-lg'});
  }

}

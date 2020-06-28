import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SolicitaInformacionComponent } from '../../modals/solicita-informacion/solicita-informacion.component';
import { AnuncioComponent } from '../../modals/anuncio/anuncio.component';

@Component({
  selector: 'app-cursos-presenciales',
  templateUrl: './cursos-presenciales.component.html',
  styleUrls: ['./cursos-presenciales.component.scss']
})
export class CursosPresencialesComponent implements OnInit, AfterViewInit {

  @ViewChild('template') template: any;

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {}
  
  ngAfterViewInit(): void {
    this.modalRef = this.modalService.show(AnuncioComponent);
  }

  showInformation(){
    const initialState = {
      modalThanks: true
    };

    this.modalRef = this.modalService.show(SolicitaInformacionComponent, {initialState});
    this.modalRef.content.onClose.subscribe(result => {
      console.log('result->' + result);
      this.openModalPhone();
    });
  }

  openModalPhone() {
    const initialState = {
      modalPhone: true
    };
    this.modalRef = this.modalService.show(SolicitaInformacionComponent, {initialState});
  }

  openModalCongrat(){
    const initialState = {
      modalCongrats: true
    };
    this.modalRef = this.modalService.show(SolicitaInformacionComponent, {initialState});
  }

}

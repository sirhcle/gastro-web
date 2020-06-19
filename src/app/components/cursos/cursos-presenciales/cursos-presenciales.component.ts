import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SolicitaInformacionComponent } from '../../modals/solicita-informacion/solicita-informacion.component';

@Component({
  selector: 'app-cursos-presenciales',
  templateUrl: './cursos-presenciales.component.html',
  styleUrls: ['./cursos-presenciales.component.scss']
})
export class CursosPresencialesComponent implements OnInit {

  public modalRef: BsModalRef;
  constructor(/*private modalService: NgbModal*/private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  showInformation(){
    this.modalRef = this.modalService.show(SolicitaInformacionComponent);
  }

}

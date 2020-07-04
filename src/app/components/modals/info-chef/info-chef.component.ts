import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-info-chef',
  templateUrl: './info-chef.component.html',
  styleUrls: ['./info-chef.component.scss']
})
export class InfoChefComponent implements OnInit {


  public onClose: Subject<string>;
  idNosotros = 0;
  textoNosotros = '';
  nombreNosotros = '';

  constructor(public bsModalRef: BsModalRef, private _service: LoginService) { }

  

  ngOnInit(): void {
    this.onClose = new Subject();
    // console.log('idChef ' + this.idNosotros);
    this._service.getChefs(this.idNosotros)
        .subscribe((resp: any) => {
          this.textoNosotros = resp[0].texto_nosotros;
          this.nombreNosotros = resp[0].nombre_nosotros;
        });
  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }

}

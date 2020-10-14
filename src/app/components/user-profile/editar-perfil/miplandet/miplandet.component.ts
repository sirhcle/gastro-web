import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OpenpayService } from 'src/app/services/openpay/openpay.service';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

declare var paypal;

@Component({
  selector: 'app-miplandet',
  templateUrl: './miplandet.component.html',
  styleUrls: ['./miplandet.component.scss']
})
export class MiPlanDetComponent implements OnInit, AfterContentInit {

  descripcionSuscripcion = '';
  nombreSuscripcion = '';
  precioSuscripcion = '';
  userMail = '';
  tipoSuscripcion = 0;

  // tslint:disable-next-line:max-line-length
  constructor(private spinner: NgxSpinnerService, private _service: SuscripcionService, private router: Router, private _openPayService: OpenpayService) { }

  ngAfterContentInit(): void {

  }
  ngOnInit(): void {
    this.spinner.show();
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);
    this.userMail = userData.username;

    // console.log(localStorage);
    this._service.getSuscripcion(userData.idUsuario)
        .subscribe((resp: any) => {
          // console.log(resp);

          if (resp.suscription.length > 0){
            this.descripcionSuscripcion = resp.suscription.descripcion_tipoSuscripciones;
            this.nombreSuscripcion = resp.suscription.nombre_tipoSuscripciones;
            this.precioSuscripcion = resp.suscription.precio_tipoSuscripciones;
            this.tipoSuscripcion = resp.suscription.tipo_suscripcion;
          }
          this.spinner.hide();
        },
        error => { console.log(error as any); this.spinner.hide(); });
  }

  openSuscripciones() {
    this.router.navigate(['/suscripcion']);
  }

  cancelaSuscripcion() {
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    this._service.getCancelarSuscripcion(userData.idUsuario)
        .subscribe((resp: any) => {
          console.log(resp);
          if (resp.status === 0) {
            alert('suscripcion cancelada');
            this.descripcionSuscripcion = '';
            this.nombreSuscripcion = '';
            this.precioSuscripcion = '';
            this.tipoSuscripcion = 0;
            this.cancelaOpenPay();
          } else {
            alert(resp.error);
          }
        });
  }


  cancelaOpenPay(){
    this._openPayService.openPayTraeSuscriptores()
        .subscribe((resp: any) => {
          // console.log(resp);

          for (const suscripcion of resp){
            if (suscripcion.email === this.userMail) {
              // tslint:disable-next-line:max-line-length
              this.getSuscriptionsCliente(suscripcion.id);
              break;
            }
          }
        });
  }

  getSuscriptionsCliente(clienteID: string){
    this._openPayService.openPayGetClientSubscript(clienteID)
        .subscribe((resp:any) => {
          console.log(resp);
          for (const suscription of resp){
            this._openPayService.openPayCancelSubscription(clienteID, suscription.id)
                .subscribe((respC: any) => {
                  console.log(respC);
                }, (error: any) => {
                  console.log(error);
                });
          }
        });
  }

}

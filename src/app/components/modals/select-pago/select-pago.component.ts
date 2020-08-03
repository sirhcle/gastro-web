import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';
import { Router } from '@angular/router';

declare var paypal;

@Component({
  selector: 'app-select-pago',
  templateUrl: './select-pago.component.html',
  styleUrls: ['./select-pago.component.scss']
})
export class SelectPagoComponent implements OnInit, AfterContentInit {

  @ViewChild('paypal') paypalElement: ElementRef;

  basicAuth = 'Basic AdYzk4zfZwskvzYnUoAzQsKTtFoJjsFaAzuJz5VUT7lQvC2Cg4qIPARnvKcVQe0PGACVe6syxAYebVk_EG65_XNlYR_r48DO2CgFnHM9Dp0TB5-8zmTNr9tJGAdsPs6NRebWIBBrR_oKNsQGR1UjsgaSnm12Qlwg';  //Pass your ClientId + scret key PROD

  // basicAuth = 'Basic AXyhsj1weGYX3VtPJfEB9fvfIlGlXOsJsa4J_sL5kDehQmsHq1_SHp-ovWYrq1v4JuWZ3p3zFCJ9K9xwEOnAFhvbk3zsr7j2hmgI-K4rMrYgkwdLYLwS7qxkeD8cobVrAxNH7poMBPumyyOHoHT01tu81qDBvmFT';  //Pass your ClientId + scret key SANDBOX

  public onClose: Subject<string>;
  public payPalConfig: IPayPalConfig;
  planId: any;
  subcripId: any;

  cantidad: any;
  concepto: any;

  constructor(public bsModalRef: BsModalRef,
    private _service: SuscripcionService,
    private router: Router) {
    //this.initConfig();
  }
  ngOnInit(): void {
    this.onClose = new Subject();
  }

  ngAfterContentInit(): void {
    
    setTimeout(() => {
      const self = this;
      switch (this.concepto) {
        case 'basica':
          // this.planId = 'P-7BG43521B28065247L4TTLKQ'; //sandbox
          this.planId = 'P-0JL83622S53201540L4TW4RA'; //produccion
          break;
        case 'premium':
          // this.planId = 'P-33R37723K61125940L4TWK5I'; //sandbox
          this.planId = 'P-47H831882M861600UL4TW4VY'; //produccion
          break;
        case 'golden':
          // this.planId = 'P-2KL74888B9054183FL4TV3UA'; //sandbox
          this.planId = 'P-5M51081751710311JL4TW5EY'; //produccion
          break;
        default:
          // this.planId = 'P-2KL74888B9054183FL4TV3UA'; //sandbox
          this.planId = 'P-0JL83622S53201540L4TW4RA'; //produccion
          break;
      }


      paypal.Buttons({
        createSubscription: function (data, actions) {
          return actions.subscription.create({
            'plan_id': self.planId,
          });
        },
        onApprove: function (data, actions) {
          console.log(data);
          alert('Suscripción correcta');
          // self.getSubcriptionDetails(data.subscriptionID);
        },
        onCancel: function (data) {
          // Show a cancel page, or return to cart  
          console.log(data);
        },
        onError: function (err) {
          // Show an error page here, when an error occurs  
          console.log(err);
        }

      }).render(this.paypalElement.nativeElement);
    }, 500);


  }
  // ============Start Get Subcription Details Method============================  
  getSubcriptionDetails(subcriptionId) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(JSON.parse(this.responseText));
        alert(JSON.stringify(this.responseText));
      }
    };
    xhttp.open('GET', 'https://api.sandbox.paypal.com/v1/billing/subscriptions/' + subcriptionId, true);
    xhttp.setRequestHeader('Authorization', this.basicAuth);

    xhttp.send();

    // ============END Get Subcription Details Method========================  

  }

  public onConfirm(): void {
    this.bsModalRef.hide();
  }

  paymentTarjeta() {
    this.onClose.next('tarjeta');
    this.bsModalRef.hide();
  }

  paymentPaypal() {
    this.onClose.next('paypal');
    this.bsModalRef.hide();
  }

  paymentEfectivo() {
    this.onClose.next('efectivo');
    this.bsModalRef.hide();
  }

  paymentOxxo() {
    this.onClose.next('oxxo');
    this.bsModalRef.hide();
  }

  pagoExitoso() {

    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    const idUsuario = userData.idUsuario;
    let idSuscripcion = 1;

    if (this.concepto === 'premium') {
      idSuscripcion = 2;
    } else if (this.concepto === 'golden') {
      idSuscripcion = 3;
    }


    this._service.postSuscripcion(idUsuario, idSuscripcion)
      .subscribe((resp: any) => {
        this.router.navigate(['/cursos-online']).then(() => {
          this.bsModalRef.hide();
          window.location.reload();
        });
      });
  }

  private initConfig(): void {
    console.log(this.cantidad);

    const appKeyProd = 'AdYzk4zfZwskvzYnUoAzQsKTtFoJjsFaAzuJz5VUT7lQvC2Cg4qIPARnvKcVQe0PGACVe6syxAYebVk_';
    const appKeySandbox = 'AXyhsj1weGYX3VtPJfEB9fvfIlGlXOsJsa4J_sL5kDehQmsHq1_SHp-ovWYrq1v4JuWZ3p3zFCJ9K9xw';

    this.payPalConfig = {
      // currency: 'USD',
      clientId: appKeySandbox,
      vault: 'true',
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      // createOrderOnClient: (data) => <ICreateOrderRequest> {
      //   intent: 'CAPTURE',
      //   purchase_units: [{
      //     amount: {
      //       currency_code: 'USD',
      //       value: this.cantidad,
      //       breakdown: {
      //         item_total: {
      //           currency_code: 'USD',
      //           value: this.cantidad
      //         }
      //       }
      //     },
      //     items: [{
      //       name: this.concepto,
      //       quantity: '1',
      //       category: 'DIGITAL_GOODS',
      //       unit_amount: {
      //         currency_code: 'USD',
      //         value: this.cantidad,
      //       },
      //     }]
      //   }]
      // },
      // advanced: {
      //   commit: 'true'
      // },
      // style: {
      //   label: 'paypal',
      //   layout: 'vertical'
      // },
      createSubscription: (data, actions) => {
        actions.subscription.create({
          plan_id: 'P-89U07303J91649915L4TSJSA'
        });
      },
      onApprove: (data, actions) => {
        // console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          // console.log('onApprove - you can get full order details inside onApprove: ', details);
          if (details.status === 'APPROVED') {
            alert('Transacción aprobada');
            this.pagoExitoso();
          } else {
            alert(details.status);
          }
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }


}

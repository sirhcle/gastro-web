import { Component, OnInit } from '@angular/core';
import { VideosServicesService } from 'src/app/services/videos/videos-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectPagoComponent } from '../modals/select-pago/select-pago.component';
import { DatosTarjetaCreditoComponent } from '../modals/datos-tarjeta-credito/datos-tarjeta-credito.component';
import { DatosTiendaConvenienciaComponent } from '../modals/datos-tienda-conveniencia/datos-tienda-conveniencia.component';
import { FastRegisterComponent } from '../modals/fast-register/fast-register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videoData: any = [];
  userData: any;
  suscrito = 0;

  showVideoContainer = false;
  widthFrame = '100%';
  heightFrame = '600';
  videoURL = '';
  urlSafe: SafeResourceUrl;

  public modalRef: BsModalRef;
  
  constructor(private _services: VideosServicesService, public sanitizer: DomSanitizer, private modalService: BsModalService) {}

  ngOnInit(): void {
    const locStorage = localStorage.getItem('userData');
    this.userData = JSON.parse(locStorage);
    //if (this.userData != )
    if (this.userData != null){
      this.suscrito = this.userData.suscrito;
    }
    this._services.getVideosGratis()
        .subscribe((resp: any) => {
          // console.log(resp.videos);
          resp.videos.forEach( videos => {
            videos.forEach(vids => {
              this.videoData.push(vids);
            });
          });
          console.log(this.videoData);
        });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  toogleVideo() {
    this.showVideoContainer = !this.showVideoContainer;
  }

  showVideo(idVideo){
    this.videoURL = `https://player.vimeo.com/video/${idVideo}`;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  }

  /*metodos seccion suscripcion suscripcion*/
  openPayment(monto, tipoMembresia) {
    this.openTipoPago(monto, tipoMembresia);
  }

  openFastRegister(monto, tipoMembresia) {
    // this.modalService.open();

    this.modalRef = this.modalService.show(FastRegisterComponent);
    this.modalRef.content.onClose.subscribe(result => {
      // console.log('result->' + result);
      if (result)
      {
        this.openTipoPago(monto, tipoMembresia);
      }
    });
  }

  openTipoPago(monto, tipoMembresia) {

    const initialState = {
      cantidad: monto,
      concepto: tipoMembresia
  };

    this.modalRef = this.modalService.show(SelectPagoComponent, {initialState});

    this.modalRef.content.onClose.subscribe(result => {
      switch (result) {
        case 'tarjeta':
          this.modalRef = this.modalService.show(DatosTarjetaCreditoComponent, { class: 'modal-lg', initialState });
          break;

        case 'paypal':
          // console.log(result);
          alert('próxiamente disponible');
          break;

        case 'efectivo':
          this.modalRef = this.modalService.show(DatosTiendaConvenienciaComponent);
          break;

        case 'oxxo':
          alert('próxiamente disponible');
          break;

        default:
          break;
      }
    });
  }

}

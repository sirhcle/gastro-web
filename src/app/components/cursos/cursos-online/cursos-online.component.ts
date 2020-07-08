import { VideosServicesService } from './../../../services/videos/videos-services.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-cursos-online',
  templateUrl: './cursos-online.component.html',
  styleUrls: ['./cursos-online.component.scss']
})


export class CursosOnlineComponent implements OnInit {

  widthFrame = '100%';
  heightFrame = '600';
  
  constructor(private _service: SuscripcionService, private router: Router) { }

  showVideoContainer = false;

  ngOnInit(): void {

    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    this._service.getSuscripcion(userData.idUsuario)
        .subscribe( (resp: any) => {
          // console.log(resp);
          // console.log(resp.suscription.length);
          // console.log(resp.suscription.id_suscripcion);

          if (resp.suscription.id_suscripcion === '0') {
            console.log('sin suscripción');
            this.router.navigate(['/home']).then( () => {
              window.location.reload();
            });
          }
        });

    window.onscroll = () => {
      const videoContainer = document.getElementById('videoContainer');
      const sticky = videoContainer.offsetTop;

      if (window.pageYOffset > 400) {
        // console.log("holaaa");
        videoContainer.classList.remove('videoContainer');
        videoContainer.classList.add('sticky');
        this.heightFrame = '100';
      } else {
        // console.log("adiossss");
        videoContainer.classList.remove('sticky');
        videoContainer.classList.add('videoContainer');
        this.heightFrame = '600';
      }
    };
  }

  toogleVideo() {
    this.showVideoContainer = !this.showVideoContainer;
  }

  openPDF(url: string) {
    window.open(url, '_blank');
  }

}

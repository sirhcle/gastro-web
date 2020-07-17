import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StoreServicesService } from 'src/app/services/store-services.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VideosServicesService } from 'src/app/services/videos/videos-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { SuscripcionService } from 'src/app/services/suscripcion/suscripcion.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [NgbRatingConfig]
})

export class ProductDetailsComponent implements OnInit {

  @ViewChild('videoFrame') myIframe: ElementRef;

  txtComentarios;

  idVideo;
  segundos = '0';
  videoData: any;
  showVideoContainer = true;
  widthFrame = '90%';
  heightFrame = '600';
  videoURL: any;
  rating = 0;
  comentarios = [];

  x = 5;
  y = 0;

  url = '';
  urlSafe: SafeResourceUrl;
  nextPaso = 0;
  currentRoute = '';


  constructor(private _httpService: StoreServicesService,
              private route: ActivatedRoute,
              private router: Router,
              private _services: VideosServicesService,
              private _serviceSubs: SuscripcionService,
              public sanitizer: DomSanitizer,
              config: NgbRatingConfig) {
    config.max = 5;
    this.currentRoute = window.location.href;
  }


  ngOnInit(): void {
    this.idVideo = this.route.snapshot.paramMap.get('productId');
    this.segundos = this.route.snapshot.paramMap.get('segundos');
    
    this.loadComments();

    window.onscroll = () => {
      const videoContainer = document.getElementById('videoContainer');
      const sticky = videoContainer.offsetTop;

      if (window.pageYOffset > 550) {
        // console.log("holaaa");
        videoContainer.classList.remove('videoContainer');
        videoContainer.classList.add('sticky');
        this.heightFrame = '150';
      } else {
        // console.log("adiossss");
        videoContainer.classList.remove('sticky');
        videoContainer.classList.add('videoContainer');
        this.heightFrame = '600';
      }
    };

    this._services.getRateVideo(this.idVideo)
      .subscribe((resp: any) => {
        // console.log(resp.promedio);
        this.y = resp.promedio;
      });

    this.loadVideo(this.segundos);
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  loadVideo(seconds) {
    // console.log(seconds);

    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    if (userData != null) {
      const idUsuario = userData.idUsuario;
      
      this._serviceSubs.getSuscripcion(userData.idUsuario)
        .subscribe((resp: any) => {

          if (resp.suscription.id_suscripcion === '0') {
            console.log('sin suscripción');
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }
        });

      this._services.getVideosById(this.idVideo, idUsuario)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.videoData = resp;
        // console.log(this.videoData.url_video);
        this.videoURL = null;
        this.videoURL = `https://player.vimeo.com/video/${this.videoData.url_video}?autoplay=1&loop=1&autopause=0#t=${seconds}s`;
        // console.log(this.videoURL);
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
      });

    } else {
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
    }
    
  }

  siguientePasoVideo() {
    if (this.nextPaso > (this.videoData.pasos.length - 1)) {
      this.nextPaso = 0;
    }
    const nextStep = this.videoData.pasos[this.nextPaso];
    console.log(nextStep.segundos_pasos);
    this.myIframe.nativeElement.src = '';
    setTimeout(() => {
      this.myIframe.nativeElement.src = `https://player.vimeo.com/video/${this.videoData.url_video}?autoplay=1&loop=1&autopause=0#t=${nextStep.segundos_pasos}s`;
    }, 500);

    this.nextPaso += 1;
  }

  anteriorPasoVideo() {
    if (this.nextPaso === 0) {
      this.nextPaso = this.videoData.pasos.length - 1;
    }

    const nextStep = this.videoData.pasos[this.nextPaso];

    this.myIframe.nativeElement.src = '';
    setTimeout(() => {
      this.myIframe.nativeElement.src = `https://player.vimeo.com/video/${this.videoData.url_video}?autoplay=1&loop=1&autopause=0#t=${nextStep.segundos_pasos}s`;
    }, 500);

    this.nextPaso -= 1;
  }

  openPDF() {
    console.log(this.videoData);
    window.open(this.videoData.pdf_video, '_blank');
  }

  addFavorite() {
    this._services.postVideoFavorito(this.videoData.id_video)
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }

  changeRating(value: number): void {
    console.log(value);
    this._services.postRateVideo(this.videoData.id_video, value)
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }

  comentar() {
    
    this._services.postComment(this.idVideo, this.txtComentarios)
        .subscribe(() => {
          // console.log(resp);
          this.loadComments();
        });
  }

  loadComments(){
    this._services.getComments(this.idVideo)
        .subscribe((resp: any) => {
          // console.log(resp);
          this.comentarios = resp.comments;
        });
  }

}

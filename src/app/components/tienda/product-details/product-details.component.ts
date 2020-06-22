import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StoreServicesService } from 'src/app/services/store-services.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VideosServicesService } from 'src/app/services/videos/videos-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [NgbRatingConfig]
})

export class ProductDetailsComponent implements OnInit {

  @ViewChild('videoFrame') myIframe: ElementRef;

  idVideo;
  videoData: any;
  showVideoContainer = true;
  widthFrame = '90%';
  heightFrame = '600';
  videoURL: any;
  rating = 0;



  url = '';
  urlSafe: SafeResourceUrl;
  nextPaso = 0;

  constructor(private _httpService: StoreServicesService,
              private route: ActivatedRoute,
              private router: Router,
              private _services: VideosServicesService,
              public sanitizer: DomSanitizer,
              config: NgbRatingConfig)
  {
    config.max = 5;
  }


  ngOnInit(): void {
    this.idVideo = this.route.snapshot.paramMap.get('productId');
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

    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);
    const idUsuario = userData.idUsuario;

    this._services.getVideosById(this.idVideo, idUsuario)
      .subscribe((resp: any) => {
        console.log(resp);
        this.videoData = resp;
        console.log(this.videoData.url_video);
        this.videoURL = `https://player.vimeo.com/video/${this.videoData.url_video}?autoplay=1&loop=1&autopause=0#t=130s`;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
      });
  }

  
  siguientePasoVideo() {
    if (this.nextPaso > (this.videoData.pasos.length - 1)){
      this.nextPaso = 0;
    }
    const nextStep = this.videoData.pasos[this.nextPaso];
    console.log(nextStep.segundos_pasos);
    this.myIframe.nativeElement.src = `https://player.vimeo.com/video/${this.videoData.url_video}?autoplay=1&loop=1&autopause=0#t=${nextStep.segundos_pasos}s`;
    this.nextPaso += 1;
  }

  anteriorPasoVideo() {
    if (this.nextPaso === 0){
      this.nextPaso = this.videoData.pasos.length - 1;
    }
    const nextStep = this.videoData.pasos[this.nextPaso];
    this.myIframe.nativeElement.src = `https://player.vimeo.com/video/${this.videoData.url_video}#t=${nextStep.segundos_pasos}`;
    this.nextPaso -= 1;
  }

  openPDF(){
    console.log(this.videoData);
    window.open(this.videoData.pdf_video, '_blank');
  }

}

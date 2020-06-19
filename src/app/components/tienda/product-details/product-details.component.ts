import { Component, OnInit } from '@angular/core';
import { StoreServicesService } from 'src/app/services/store-services.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VideosServicesService } from 'src/app/services/videos/videos-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {

  idVideo;
  videoData: any;
  showVideoContainer = true;
  widthFrame = '100%';
  heightFrame = '600';
  videoURL: any;


  url = '';
  urlSafe: SafeResourceUrl;

  constructor(private _httpService: StoreServicesService,
              private route: ActivatedRoute,
              private router: Router,
              private _services: VideosServicesService,
              public sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.idVideo = this.route.snapshot.paramMap.get('productId');
    window.onscroll = () => {
      const videoContainer = document.getElementById('videoContainer');
      const sticky = videoContainer.offsetTop;

      if (window.pageYOffset > 400) {
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

    this._services.getVideosById(this.idVideo)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.videoData = resp;
        console.log(this.videoData.url_video);
        

        this.videoURL = `https://player.vimeo.com/video/${this.videoData.url_video}`;

        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);

      });

  }

}

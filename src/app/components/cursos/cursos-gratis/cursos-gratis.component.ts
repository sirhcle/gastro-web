import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideosServicesService } from 'src/app/services/videos/videos-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cursos-gratis',
  templateUrl: './cursos-gratis.component.html',
  styleUrls: ['./cursos-gratis.component.scss']
})
export class CursosGratisComponent implements OnInit {

  widthFrame = '100%';
  heightFrame = '600';
  showVideoContainer = false;
  videoData: any;

  videoURL = '';
  urlSafe: SafeResourceUrl;

  constructor(private router: Router, private _services: VideosServicesService, public sanitizer: DomSanitizer) { }
  

  ngOnInit(): void {
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

    this._services.getVideosGratis()
        .subscribe((resp: any) => {
          console.log(resp.videos);
          this.videoData = resp.videos;
        });

  }

  openSuscripcion() {
    this.router.navigate(['/suscripcion']);
  }

  toogleVideo() {
    this.showVideoContainer = !this.showVideoContainer;
  }

  showVideo(idVideo){
    this.videoURL = `https://player.vimeo.com/video/${idVideo}`;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  }

}

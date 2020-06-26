import { Component, OnInit, PipeTransform, Pipe, Input} from '@angular/core';
import { FavoritosService } from 'src/app/services/perfil/favoritos.service';
import { NgForOf } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';
import { Custom } from '@ngu/carousel/lib/ngu-carousel/ngu-carousel';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

/*@Component({
  selector: 'ngbd-modal-content',
  template: `<div id='videoContainer' class="videoContainer col-12">
    <iframe src="videoUrl" width="{{widthFrame}}" height="{{heightFrame}}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
    </div>`,
})
export class NgbdModalContent {
  @Input() videoUrl: string;
widthFrame = '600';
heightFrame = '100%';
  constructor(public activeModal: NgbActiveModal) {
    window.onscroll = () => {
      const videoContainer = document.getElementById('videoContainer');
      const sticky = videoContainer.offsetTop;
      if (window.pageYOffset > 400) {
        videoContainer.classList.remove('videoContainer');
        videoContainer.classList.add('sticky');
        this.widthFrame = '100';
      } else {
        videoContainer.classList.remove('sticky');
        videoContainer.classList.add('videoContainer');
        this.widthFrame = '700';
      }
  }
};
}*/

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.scss']
})

export class MisComprasComponent implements OnInit {
public videos: Array<Custom>;
public video: Array<any>;
widthFrame = '100%';
heightFrame = '600';
showVideoContainer = false;

mainUrl = 'https://player.vimeo.com/video/';
videoUrl = '';
  constructor(private spinner: NgxSpinnerService, private _favoritosService : FavoritosService, private router: Router) {
    this.video = newArray('' as any) ;
   }
  ngOnInit(): void {
    this.spinner.show();
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);
    console.log(localStorage);

    this._favoritosService.getFavoritos(userData.idUsuario).subscribe(response => {
      this.videos = response.videos;
      for (let elemento of this.videos){
       for (let detalle of elemento){
         this.video.push(detalle);
       }
      }
      this.spinner.hide();},
error => {console.log(error as any);
          this.spinner.hide(); });

    window.onscroll = () => {
  const videoContainer = document.getElementById('videoContainer');
  const sticky = videoContainer.offsetTop;

  if (window.pageYOffset > 400) {
    videoContainer.classList.remove('videoContainer');
    videoContainer.classList.add('sticky');
    this.widthFrame = '100';
  } else {
    videoContainer.classList.remove('sticky');
    videoContainer.classList.add('videoContainer');
    this.widthFrame = '700';
  }
};

  }

  toggleVideo(url) {
     this.videoUrl = this.mainUrl + url.toString();
     this.showVideoContainer = !this.showVideoContainer;
     url = " ";
     //const modalRef = this.modalService.open(NgbdModalContent);
     //modalRef.componentInstance.name = this.videoUrl;
  }
}

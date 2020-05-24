import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-cursos-online',
  templateUrl: './cursos-online.component.html',
  styleUrls: ['./cursos-online.component.scss']
})


export class CursosOnlineComponent implements OnInit {

  constructor() { }

  showVideoContainer = false;

  ngOnInit(): void {
    window.onscroll = () => {
      const videoContainer = document.getElementById('videoContainer');
      const sticky = videoContainer.offsetTop;

      if (window.pageYOffset > 400) {
        // console.log("holaaa");
        videoContainer.classList.remove('videoContainer');
        videoContainer.classList.add('sticky');
      } else {
        // console.log("adiossss");
        videoContainer.classList.remove('sticky');
        videoContainer.classList.add('videoContainer');
      }
    };
  }

  toogleVideo() {
    this.showVideoContainer = !this.showVideoContainer;
  }

}

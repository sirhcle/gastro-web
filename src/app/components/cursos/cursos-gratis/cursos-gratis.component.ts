import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-gratis',
  templateUrl: './cursos-gratis.component.html',
  styleUrls: ['./cursos-gratis.component.scss']
})
export class CursosGratisComponent implements OnInit {

  widthFrame = '100%';
  heightFrame = '600';
  showVideoContainer = false;
  
  constructor(private router: Router) { }
  

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
  }

  openSuscripcion() {
    this.router.navigate(['/suscripcion']);
  }

  toogleVideo() {
    this.showVideoContainer = !this.showVideoContainer;
  }

}

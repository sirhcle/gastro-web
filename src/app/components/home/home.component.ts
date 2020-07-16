import { Component, OnInit } from '@angular/core';
import { VideosServicesService } from 'src/app/services/videos/videos-services.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videoData: any = [];
  userData: any;
  suscrito = 0;

  constructor(private _services: VideosServicesService) {}

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

}

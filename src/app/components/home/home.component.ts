import { Component, OnInit } from '@angular/core';
import { VideosServicesService } from 'src/app/services/videos/videos-services.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videoData: any = [];

  constructor(private _services: VideosServicesService) {}

  ngOnInit(): void {
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

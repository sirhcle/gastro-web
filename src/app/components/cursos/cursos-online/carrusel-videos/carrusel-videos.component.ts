import { Component, OnInit, Input } from '@angular/core';
import { VideosServicesService } from 'src/app/services/videos/videos-services.service';

@Component({
  selector: 'app-carrusel-videos',
  templateUrl: './carrusel-videos.component.html',
  styleUrls: ['./carrusel-videos.component.scss']
})
export class CarruselVideosComponent implements OnInit {

  @Input() carouselID: string;
  videoData: any;
  videos3x3: [any];

  constructor(private _services: VideosServicesService) { }

  ngOnInit(): void {
    this._services.getVideosList()
      .subscribe((response: any) => {
        this.videoData = response.videos;
        // console.log(response);
      });
  }

}

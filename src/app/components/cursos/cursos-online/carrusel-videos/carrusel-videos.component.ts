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
  tituloVideos = '';

  constructor(private _services: VideosServicesService) { }

  ngOnInit(): void {

    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    switch (this.carouselID) {

      case 'continuarViendo':
        this.tituloVideos = 'CONTINUAR VIENDO';

        this._services.getVideosRecentViews(userData.idUsuario)
          .subscribe((response: any) => {
            this.videoData = response.videos;
            console.log(this.videoData);
          });
        break;

      case 'agregadosRecientemente':
        this.tituloVideos = 'AGREGADOS RECIENTEMENTE';
        this._services.getVideosRecent()
          .subscribe((response: any) => {
            this.videoData = response.videos;
            console.log('videos recientes:');
            console.log(this.videoData);
          });
        break;

      case 'misFavoritos':
        this.tituloVideos = 'MIS FAVORITOS';
        this._services.getVideoUserFavos(userData.idUsuario)
            .subscribe((response: any) => {
              this.videoData = response.videos;
              console.log('videos favoritos:');
              console.log(this.videoData);
            });
        break;

      case 'todosLosVideos':
        this.tituloVideos = 'TODOS LOS VIDEOS';
        this._services.getVideosList(userData.idUsuario)
          .subscribe((response: any) => {
            this.videoData = response.videos;
            console.log('todos los videos');
            console.log(this.videoData);
          });
        break;

      default:
        break;
    }


  }

  saveFavorite(idVideo) {
    const locStorage = localStorage.getItem('userData');
    const userData = JSON.parse(locStorage);

    this._services.postFavoriteVideo(userData.idUsuario, idVideo)
      .subscribe((resp: any) => {
        // console.log(resp);
        window.location.reload();
      });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosServicesService {

  private locStorage = localStorage.getItem('userData');
  private userData = JSON.parse(this.locStorage);
  private idUsuario;

  constructor( private httpClient: HttpClient) {
    if (this.userData != null){
      this.idUsuario = this.userData.idUsuario;
    }
  }

  getVideosList(idUsuario): Observable<any> {
    const body = new HttpParams()
    .set('idUsuario', idUsuario);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=getVideos',
      body.toString(),
      headers);
  }

  getVideosById(idVideo, idUsuario): Observable<any> {

    const body = new HttpParams()
    .set('idUsuario', idUsuario)
    .set('idVideo', idVideo);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=getVideo',
      body.toString(),
      headers
    );
  }

  postFavoriteVideo(idUsuario, idVideo) {

    const body = new HttpParams()
    .set('idUsuario', idUsuario)
    .set('idVideo', idVideo);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=addFavorites',
      body.toString(),
      headers
    );
  }


  getVideoUserFavos(idUsuario): Observable<any> {
    const body = new HttpParams()
    .set('idUsuario', idUsuario);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=getFavorites2',
      body.toString(),
      headers
    );
  }

  getVideosRecentViews(idUsuario): Observable<any> {
    const body = new HttpParams()
    .set('idUsuario', idUsuario);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=getVideosRecentsViews',
      body.toString(),
      headers
    );
  }

  getVideosRecent(): Observable<any> {
    const body = new HttpParams();

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=getMoreRecents',
      body.toString(),
      headers
    );
  }

  getVideosGratis(): Observable<any> {
    const body = new HttpParams();

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=getVideosFree',
      body.toString(),
      headers
    );
  }

  postVideoFavorito(idVideo) {
    const body = new HttpParams()
    .set('idUsuario', this.idUsuario)
    .set('idVideo', idVideo);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=addFavorites',
      body.toString(),
      headers
    );
  }

  postRateVideo(idVideo, calificacion) {
    const body = new HttpParams()
    .set('idUsuario', this.idUsuario)
    .set('idVideo', idVideo)
    .set('calificacion', calificacion);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=rateVideo',
      body.toString(),
      headers
    );
  }

  getRateVideo(idVideo) {
    const body = new HttpParams()
    .set('idUsuario', this.idUsuario)
    .set('idVideo', idVideo);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=getRateVideo',
      body.toString(),
      headers
    );
  }

  getComments(idVideo) {
    const body = new HttpParams()
    .set('idUsuario', this.idUsuario)
    .set('idVideo', idVideo);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=getComments',
      body.toString(),
      headers
    );
  }

  postComment(idVideo, comentario) {
    const body = new HttpParams()
    .set('idUsuario', this.idUsuario)
    .set('idVideo', idVideo)
    .set('comentario', comentario);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=comment',
      body.toString(),
      headers
    );
  }


}

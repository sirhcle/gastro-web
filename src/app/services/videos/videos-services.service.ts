import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosServicesService {

  constructor( private httpClient: HttpClient) {}

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
}

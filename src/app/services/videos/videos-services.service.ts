import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosServicesService {

  constructor( private httpClient: HttpClient) {}

  getVideosList(): Observable<any> {
    return this.httpClient.get('https://gigahert.com.mx/gastroAdmin/webService.php?method=getVideos');
  }

  getVideosById(idVideo): Observable<any> {
    return this.httpClient.get(`https://gigahert.com.mx/gastroAdmin/webService.php?method=getVideo&idVideo=${idVideo}`);
  }
}

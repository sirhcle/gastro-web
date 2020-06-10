import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreServicesService {

  constructor( private httpClient: HttpClient) {}

  getVideoPDP(idVideo: string) {
    // const headers = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //   })
    // };

    // let headers = new Headers();

    return this.httpClient.get('https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/{{idVideo}}&width=480&height=360');
  }
}

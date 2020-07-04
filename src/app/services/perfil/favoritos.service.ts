import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  public url: string;
  constructor(private httpClient: HttpClient) {
    this.url = 'https://gigahert.com.mx/';
   }
  getFavoritos(idUsuario): Observable<any>{
    const body = new HttpParams().set('idUsuario', idUsuario);
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(this.url + 'gastroAdmin/webService.php?method=getFavorites2', body.toString(),
    headers);
  }
}

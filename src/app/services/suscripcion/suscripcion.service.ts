import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor( private httpClient: HttpClient) {}

  postSuscripcion(idUsuario, idSuscripcion, tipoSuscripcion): Observable<any> {
    const body = new HttpParams()
    .set('idUsuario', idUsuario)
    .set('idSuscripcion', idSuscripcion)
    .set('tipoSuscripcion', tipoSuscripcion);

    //console.log(body);
    
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=registerSuscription',
      body.toString(),
      headers);
  }

  getSuscripcion(idUsuario){
    const body = new HttpParams()
    .set('idUsuario', idUsuario);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=getSuscription',
      body.toString(),
      headers);
  }

  getCancelarSuscripcion(idUsuario){
    const body = new HttpParams()
    .set('idUsuario', idUsuario);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=cancelSuscription',
      body.toString(),
      headers);
  }

  getPaypalUserInfo(){
    // const body = new HttpParams()
    // .set('idUsuario', idUsuario);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', '')
    };
    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=cancelSuscription',
      headers);
  }
}

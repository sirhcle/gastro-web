import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {
  public url: string;
  constructor(private httpClient: HttpClient) {
    this.url = 'https://gigahert.com.mx/';
   }
  agregarDireccion(calle, numero, colonia, ciudad, estado, cp, idUsuario): Observable<any>{
    const body = new HttpParams().set('calleDireccion', calle)
    .set('numeroDireccion', numero)
    .set('coloniaDireccion', colonia)
    .set('alcaldiaDireccion', ciudad)
    .set('ciudadDireccion', ciudad)
    .set('estadoDireccion', estado)
    .set('cpDireccion', cp)
    .set('idUsuario', idUsuario);
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(this.url + 'gastroAdmin/webService.php?method=registerAddress', body.toString(),
    headers);
  }
}

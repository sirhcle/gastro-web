import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class EdicionService {
public url: string;

  constructor( private httpClient: HttpClient) {
    this.url = 'https://gigahert.com.mx/';
  }


  getUsuario(idUsuario): Observable<any>{

    const body = new HttpParams().set('idUsuario', idUsuario);
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(this.url + 'gastroAdmin/webService.php?method=getUser', body.toString(),
    headers);
  }

  updateUsuario(idUsuario, nombre, usuario, correo, ubicacion, acerca): Observable<any>{
    const body = new HttpParams().set('idUsuario', idUsuario)
    .set('nombre', nombre)
    .set('usuario', usuario)
    .set('correo', correo)
    .set('ubicacion', ubicacion)
    .set('acerca', acerca);
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(this.url + 'gastroAdmin/webService.php?method=updateUser', body.toString(),
    headers);
  }

  updatePassword(idUsuario, oldPassword, password): Observable<any>{
    const hash1: string = Md5.hashStr(oldPassword) as string;
    const hash2: string = Md5.hashStr(password) as string;
    const body = new HttpParams().set('idUsuario', idUsuario)
    .set('oldPassword', hash1)
    .set('password', hash2);
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(this.url + 'gastroAdmin/webService.php?method=updatePassword', body.toString(),
    headers);
  }

  updateImg(idUsuario, imgUpload: File): Observable<boolean> {
    const endpoint = this.url + 'uploadifyImageProfile.php?idUsuario=' + idUsuario;
    const formData: FormData = new FormData();
    formData.append('Filedata', imgUpload, imgUpload.name);
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'multipart/form-data')
    };
    return this.httpClient.post(endpoint, formData, headers).pipe(map(() => true));
}
}

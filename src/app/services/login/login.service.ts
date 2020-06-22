import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private httpClient: HttpClient) {}

  doLogin(username: string, password: string): Observable<any> {

    const hash: string = Md5.hashStr(password) as string;

    const body = new HttpParams()
    .set('correoUsuario', username)
    .set('passwordUsuario', hash);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=login',
      body.toString(),
      headers
    );
  }


  postCreateUser(username: string, password: string, correo: string): Observable<any> {

    const hash: string = Md5.hashStr(password) as string;

    const body = new HttpParams()
    .set('nombreUsuario', username)
    .set('correoUsuario', correo)
    .set('contraUsuario', hash);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=registerUser',
      body.toString(),
      headers
    );
  }

  postResetPassword(correo: string): Observable<any> {

    // const hash: string = Md5.hashStr(password) as string;
    console.log(correo);
    
    const body = new HttpParams()
    .set('emailUsuario', correo);

    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(
      'https://gigahert.com.mx/gastroAdmin/webService.php?method=recoveryPassword',
      body.toString(),
      headers
    );
  }
}

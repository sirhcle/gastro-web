import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenpayService {

  constructor( private httpClient: HttpClient) {}

  openPayTraeSuscriptores() {
    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic c2tfMDE4MDc2Mjg4NTJiNDIyZmE5ZmY2NDcyNDQzZGVkYTg6')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(
      'https://sandbox-api.openpay.mx/v1/mkhlhyhzipnwjnikydcr/customers',
      headers);
  }


  openPayCreaSuscripcion(customerID: string) {

    const raw = JSON.stringify({
      card: {
        card_number: '4111111111111111',
        holder_name: 'Juan Perez Ramirez',
        expiration_year: '20',
        expiration_month: '12',
        cvv2: '110',
        device_session_id: 'kR1MiQhz2otdIuUlQkbEyitIqVMiI16f'
     },
     plan_id: 'pvtolvs4f9gdtyej6jj2'
    });

    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic c2tfMDE4MDc2Mjg4NTJiNDIyZmE5ZmY2NDcyNDQzZGVkYTg6')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(
      'https://sandbox-api.openpay.mx/v1/mkhlhyhzipnwjnikydcr/customers/' + customerID + '/subscriptions',
      raw,
      headers);
  }

  openPayCrearCliente(_name: string, _email:string){
    const raw = JSON.stringify({
      name: _name,
      email: _email,
      requires_account: false
    });

    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic c2tfMDE4MDc2Mjg4NTJiNDIyZmE5ZmY2NDcyNDQzZGVkYTg6')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(
      'https://sandbox-api.openpay.mx/v1/mkhlhyhzipnwjnikydcr/customers',
      raw,
      headers);
  }
}

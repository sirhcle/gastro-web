import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OpenpayService {

  constructor( private httpClient: HttpClient) {}

  merchandIDSandbox = 'mkhlhyhzipnwjnikydcr';
  merchandIDProd = 'm3hnzpyqlorpf0n3biek';

  openPayTraeSuscriptores() {
    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic c2tfMDE4MDc2Mjg4NTJiNDIyZmE5ZmY2NDcyNDQzZGVkYTg6')
        .set('Content-Type', 'application/json')
    };

    
    return this.httpClient.get(
      'https://sandbox-api.openpay.mx/v1/' + this.merchandIDProd + '/customers',
      headers);
  }

  openPayCreaToken(cardNumer: string, holderName: string, expiration: string, cvv: string) {
    const expirationArr = expiration.split('/');
    const expirationYear = expirationArr[1];
    const expirationMonth = expirationArr[0];

    const raw = JSON.stringify({
      card_number: cardNumer,
      holder_name: holderName,
      expiration_year: expirationYear,
      expiration_month: expirationMonth,
      cvv2: cvv
    });

    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic c2tfMDE4MDc2Mjg4NTJiNDIyZmE5ZmY2NDcyNDQzZGVkYTg6')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(
      'https://sandbox-api.openpay.mx/v1/' + this.merchandIDProd + '/tokens',
      raw,
      headers);
  }


  // tslint:disable-next-line:max-line-length
  openPayCreaSuscripcion(customerID: string, cardNumer: string, holderName: string, expiration: string, cvv: string, tipoPlan: string, tokenID: string) {

    const expirationArr = expiration.split('/');
    const expirationYear = expirationArr[1];
    const expirationMonth = expirationArr[0];

    // SANDBOX
    // plan-id basico => pvtolvs4f9gdtyej6jj2     <- basica
    // plan-id premium => pi1tmvt9ftp87avkpfwk    <- premium
    // plan-id golden => pooxhdz1l72d0h5340er     <- golden

    let planID = '';

    //SANDBOX
    if (tipoPlan === 'basica'){
      planID = 'pvtolvs4f9gdtyej6jj2';
    } else if (tipoPlan === 'premium'){
      planID = 'pi1tmvt9ftp87avkpfwk';
    } else if (tipoPlan === 'golden'){
      planID = 'pooxhdz1l72d0h5340er';
    } else {
      planID = 'pvtolvs4f9gdtyej6jj2';
    }

    //PRODUCCION
    /*if (tipoPlan === 'basica'){
      planID = 'pvtolvs4f9gdtyej6jj2';
    } else if(tipoPlan === 'premium'){
      planID = 'pi1tmvt9ftp87avkpfwk';
    } else if (tipoPlan === 'golden'){
      planID = 'pooxhdz1l72d0h5340er';
    } else {
      planID = 'pvtolvs4f9gdtyej6jj2';
    }*/

    const raw = JSON.stringify({
      /*card: {
        card_number: cardNumer,
        holder_name: holderName,
        expiration_year: expirationYear,
        expiration_month: expirationMonth,
        cvv2: cvv,
        device_session_id: 'kR1MiQhz2otdIuUlQkbEyitIqVMiI16f'
     },*/
     source_id: tokenID,
     plan_id: planID,
     status: 'active'
    });

    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic c2tfMDE4MDc2Mjg4NTJiNDIyZmE5ZmY2NDcyNDQzZGVkYTg6')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(
      'https://sandbox-api.openpay.mx/v1/' + this.merchandIDProd + '/customers/' + customerID + '/subscriptions',
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
      'https://sandbox-api.openpay.mx/v1/' + this.merchandIDProd + '/customers',
      raw,
      headers);
  }

  openPayGetClientSubscript(clientID){
    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic c2tfMDE4MDc2Mjg4NTJiNDIyZmE5ZmY2NDcyNDQzZGVkYTg6')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.get(
      'https://sandbox-api.openpay.mx/v1/' + this.merchandIDProd + '/customers/' + clientID + '/subscriptions',
      headers);
  }

  openPayCancelSubscription(clientID, subscriptionID){
    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic c2tfMDE4MDc2Mjg4NTJiNDIyZmE5ZmY2NDcyNDQzZGVkYTg6')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.delete(
      'https://sandbox-api.openpay.mx/v1/' + this.merchandIDProd + '/customers/' + clientID + '/subscriptions/' + subscriptionID,
      headers);
  }


}

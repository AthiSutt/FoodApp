import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(public HttpClient:HttpClient) {}

  public sendFeedback():any{

    let url ="http://localhost:8080/register";
    return this.HttpClient.get(url);

  }

}

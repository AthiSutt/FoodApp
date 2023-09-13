import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddNewItemServiceService {

  constructor(public HttpClient:HttpClient) {}

  public sendFeedback():any{

    let url ="http://localhost:8080/addNewItem";
    return this.HttpClient.get(url);

  }

}

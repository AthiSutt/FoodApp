import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckIdService {

  constructor(private  http:HttpClient) {}

  public checkID(): any {
    let url = `http://localhost:8080/checkItemId`;
    return this.http.delete(url);
  }
}

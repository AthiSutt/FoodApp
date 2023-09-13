import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RazorpayServiceService {

  private razorpayApiUrl = 'https://api.razorpay.com/v1'; // Replace with the actual Razorpay API URL

  constructor(private http:HttpClient ) {}

  fetchDataFromRazorpay() {
    // Replace with your actual Razorpay API endpoint
    const endpoint = `${this.razorpayApiUrl}/your/endpoint`;

    // Make an HTTP GET request
    return this.http.get(endpoint);
  }
}

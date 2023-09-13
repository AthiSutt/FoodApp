import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  private captchaValue: string = '';
  
  constructor() { }



  getCaptchaValue(): string {
    return this.captchaValue;
  }

  generateRandomCaptcha(): void {
    // Generate a random number and convert it to a string
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    this.captchaValue = randomNumber.toString();
  }
}

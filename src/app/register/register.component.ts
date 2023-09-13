import { Component, OnInit } from '@angular/core';
import { User, AppComponent } from '../app.component';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { Form,FormBuilder,FormsModule } from '@angular/forms';
import { CaptchaService } from '../captcha.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  captchaValue: string ='';
  captchaErrorMessage: string = '';
  registrationSuccess: boolean = false;

  constructor(private http:HttpClient, private router:Router, private captcha : CaptchaService) {
    this.present =false;
  }

  ngOnInit()  {

    this.captchaValue = this.captcha.getCaptchaValue();

    // If the CAPTCHA value is empty, generate a new one
    if (!this.captchaValue) {
      this.generateAndSetCaptchaValue();
    }

  }


  model:User={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    address:'',
    phone:0,
    merchant:true
  };

  options:string='';
  present:boolean | undefined;
  usernameAvailability!:string;
  fontColor!:string ;

  phoneValidation:boolean=true;
  emailValidation:boolean=true;
  passwordValidation:boolean=true;

  usernamePresent():void{
    this.fontColor='';

    // if (this.model.username.trim() === '') {
    //   // Username is empty, do not make the API call
    //   this.present = false;
    //   this.usernameAvailability = '';
    //   return;
    // }
    let url = "http://localhost:8080/checkUserName";



    this.http.post<boolean>(url,this.model.username).subscribe(
      res=>{
        this.present=res;
        console.log(this.present);
        if(this.present) {
          this.fontColor="red";
          this.usernameAvailability = "UserName Already Taken";
        }
        else {
          this.fontColor="green";
          this.usernameAvailability = "Available";
        }
        this.router.navigate(['register']);
      }
    )
  }


  checkUsernameAvailability(): void {
    // Check if the username is not empty before making the API call
    if (this.model.username.trim() === '') {
      // Display a message or take appropriate action
      return;
    }
    // Call the usernamePresent() function to check availability
    this.usernamePresent();
  }



  updateSelect(){
    this.model.merchant = this.options.length != 4;
}

checkPhone()
{
  let matcher = new RegExp('^[+ 0-9]{10}$');
  if (String(this.model.phone).length==10)
    this.phoneValidation=(matcher.test(String(this.model.phone)));
}

checkEmail(){
  if(this.model.email.length==0)
  {
    this.emailValidation=true;
  }
  if(this.model.email.length>0 &&(this.model.email).indexOf("@")==-1)
    this.emailValidation=false;
  if(this.model.email.length>0 &&(this.model.email).indexOf("@")!=-1)
    this.emailValidation=true;
}

passwordStrength(){
  if(this.model.password.length==0)
    this.passwordValidation=true;
  if(this.model.password.length<8)
    this.passwordValidation=false;
  if(this.model.password.length>=8)
  {
    let matcher = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,16})');
    this.passwordValidation=matcher.test(this.model.password);
  }
}

registerUser():void{
  this.updateSelect();

  let url = "http://localhost:8080/register";
  this.http.post<User>(url,this.model).subscribe(
    res=>{
      AppComponent.modelUser =res;
      this.router.navigate(['welcome']);
    },
    err=>{
      console.log([this.model]);
      alert("An error has occurred while Registering");
    }
  )
}

generateAndSetCaptchaValue(): void {
  // Generate and set a new CAPTCHA value
  this.captcha.generateRandomCaptcha();
  this.captchaValue = this.captcha.getCaptchaValue();
}

checkform(event: Event): void{
  event.preventDefault(); // Prevent the default form submission

    // Get the CAPTCHA input value
    const captchaInputValue = (document.getElementById('CaptchaInput') as HTMLInputElement).value;

    // Replace '12345' with the actual CAPTCHA value you expect
    //const expectedCaptchaValue = '12345';

    // Check if the entered CAPTCHA matches the expected value
    if (captchaInputValue === this.captchaValue) {
      alert('CAPTCHA verified successfully');
    } else {
      alert('CAPTCHA not verified');
    }

    this.generateAndSetCaptchaValue();
  }

  // generateRandomCaptcha(): string {
  //   // Generate a random number and convert it to a string
  //   const randomNumber = Math.floor(Math.random() * 90000) + 10000;
  //   return randomNumber.toString();
  // }


}

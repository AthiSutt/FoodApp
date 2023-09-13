import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AppComponent, User } from '../app.component';
import { Login } from '../Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  model:Login={
    username: '',
    password:''


  };

  forgotPasswordData = {
    username: '',
    newPassword: '',
    confirmPassword: ''
  };

  message:string='';

  isForgotPasswordFormVisible : boolean=false;

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit() {
    if(sessionStorage.length>0)
      this.router.navigate(['welcome']);
  }
  openForgotPasswordForm() {

    this.isForgotPasswordFormVisible = true;

    console.log("openForgotPasswordForm() called");

    // Show the forgot password modal
    // const modal = document.getElementById('forgot-password-modal');
    // if (modal) {
    //   modal.style.display = 'block';
    //   console.log("openForgotPasswordModal() called");
    // }

  }

  closeForgotPasswordForm() {

    this.isForgotPasswordFormVisible = false;
    // Hide the forgot password modal
    // const modal = document.getElementById('forgot-password-modal');
    // if (modal) {
    //   modal.style.display = 'none';
    // }
    // console.log("closeForgotPasswordModal() called");
  }
  resetPassword() {

    // Add your password reset logic here
    if (this.forgotPasswordData.newPassword === this.forgotPasswordData.confirmPassword) {
      // Send a request to reset the password using this.forgotPasswordData.username
      // Handle the response accordingly
      // Close the form after password reset
      this.closeForgotPasswordForm();
    } else {
      // Display an error message if passwords do not match
      alert("Passwords do not match. Please try again.");
    }
    // Handle password reset logic here, e.g., send a confirmation email
    // You can access the input values using document.getElementById
    // const username = (document.getElementById('username') as HTMLInputElement).value;
    // const newPassword = (document.getElementById('new-password') as HTMLInputElement).value;
    // const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

    // // Implement your password reset logic here, e.g., send an email

    // // Close the modal after password reset
    // this.closeForgotPasswordModal();
  }

  sendFeedback(): void {
    let url = "http://localhost:8080/login";
    let key='userData';
    this.http.post<User>(url,this.model).subscribe(
      res => {
       //localStorage.setItem(key,JSON.stringify(res));

        sessionStorage.setItem(key,JSON.stringify(res));
        //sessionStorage.setItem('token','HTTP_TOKEN');
        if(res!=null && !res.merchant) {
          this.router.navigate(['welcome']);
        }
        if(res!=null && res.merchant){
          this.router.navigate(['merchantWelcome']);
        }
        if(res==null) {
          this.message = "Username Or Password is Wrong";
          sessionStorage.removeItem('key');
          sessionStorage.clear();
        }
      },
      err=>{
        console.log([this.model]);
        alert("An error has occurred while logging in");
      }
    )
  }


}


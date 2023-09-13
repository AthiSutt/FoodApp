import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  modelUser: User = {
    username:'',
    password:'',
    email:'',
    phone:0,
    firstname:'',
    lastname:'',
    address:'',
    merchant: false
  };

  constructor(private router:Router) {
    //user: User = AppComponent.modelUser;

  }


  ngOnInit() {

    // let userData = localStorage.getItem('userData');
    // if(userData !=null){
    //   this.modelUser=JSON.parse(userData)
    // }else{
    //   this.router.navigate(['login']);this.router.navigate(['login']);
    //   localStorage.setItem('userData', JSON.stringify(userData));
    // }
    // if (sessionStorage.getItem("userData")==null) {
    //   this.router.navigate(['login']);
    // }

      let userDataString  = sessionStorage.getItem('userData');
      let userData: User;
      if(userDataString  !==null){
        userData = JSON.parse(userDataString);
        console.log(userData);
        Object.assign(this.modelUser,userData);
      }else{
        this.router.navigate(['login']);
      }
      //console.log(userData);
      //Object.assign(this.modelUser,userData);


    }

  clearLocal(){
    sessionStorage.clear();
  }

}

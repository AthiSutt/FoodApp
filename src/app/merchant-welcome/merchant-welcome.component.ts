import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app.component';

@Component({
  selector: 'app-merchant-welcome',
  templateUrl: './merchant-welcome.component.html',
  styleUrls: ['./merchant-welcome.component.css']
})
export class MerchantWelcomeComponent implements OnInit {

  modelMerchant: User = {
    username:'',
    password:'',
    email:'',
    phone:0,
    firstname:'',
    lastname:'',
    address:'',
    merchant:true
  };

  constructor(private router:Router) { }

  ngOnInit() {

    let userDataString  = sessionStorage.getItem('userData');

if (userDataString  !== null) {
  const userData = JSON.parse(userDataString );
  Object.assign(this.modelMerchant,userData);
} else {
  this.router.navigate(['login']);
  //console.log(userData);

}
  }

  //   if (sessionStorage.getItem("userData")==null) {
  //     this.router.navigate(['login']);
  //   }

  //   let userData = JSON.parse(sessionStorage.getItem('userData'));
  //   console.log(userData);
  //   Object.assign(this.modelMerchant,userData);
  // }


  clearLocal(){
    sessionStorage  .clear();
  }

}



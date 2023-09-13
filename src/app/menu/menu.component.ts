  import { HttpClient } from '@angular/common/http';
  import { ApplicationModule,Component, OnInit} from '@angular/core';
  import { Router } from '@angular/router';
  import { MenuServiceService } from '../menu-service.service';
  import { Observable } from 'rxjs';
  import { count } from 'rxjs';
  import { AppComponent } from '../app.component';
  import { menu } from '../menu';
  import { Quantity } from '../Quantity';
  import { cart } from '../cart';
  import { TotalAmountService } from '../total-amount-service.service';


  //declare var Razorpay: any;

  @Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
  })
  export class MenuComponent implements OnInit {

    model:menu[] =[];
    values:Quantity[] = [];
    total!: number;

    modalCart:cart={
      quantity1:0,
      quantity2:0,
      quantity3:0,
      quantity4:0,
      quantity5:0,
      quantity6:0,
      quantity7:0,
      quantity8:0,
      quantity9:0

    };

    // currentPage = 1; // Initialize the current page to 1
    // itemsPerPage = 4;
    itemsPerPage =4;
    //p: number = 1;
    currentPage: number = 1;

    constructor(private http:HttpClient, private router:Router,private menuService:MenuServiceService , private totalAmount:TotalAmountService) { }

    ngOnInit() {
      if (sessionStorage.getItem("userData") == null) {
        this.router.navigate(['login']);
      }
      this.getItems();
    }


    clearLocal(){
      sessionStorage.clear();
    }

    getItems():void{
      this.menuService.getItems().subscribe((men: any[]) => {
        this.values = this.model.map(() => new Quantity());
        this.model = men;
        for (let i=0;i<this.model.length;i++){
          this.values.push(new Quantity());
          this.values[i].quantity=0;
        }
      });
    }

    getCurrentPageItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.model.slice(startIndex, endIndex);
    }



    isAnyItemSelected(): boolean {
      return this.values.some(item => item.quantity > 0);
    }

    // payNow(){

    //   const RazorpayOptions ={
    //     description : 'Sample demo',
    //     currency: 'INR',
    //     amount:this.total *100,
    //     name: 'Athira KM',
    //     key :'rzp_test_QfBHdjnMkfiMdC',
    //     image:'',
    //     prefill:{
    //       name:'Athira KM',
    //       email:'athira@gmail.com',
    //       phone:'3212321234',

    //     },
    //     theme:{
    //       color:'#25d93a'
    //     },
    //     modal:{
    //       ondismiss:()=>{
    //         console.log('dismissed')
    //       }
    //     }


    //   }

    //   const callBack = (paymnetId : any) =>{

    //     console.log(paymnetId);

    //   }

    //   const failurecallBack = (e: any) =>{
    //     console.log(e);
    //   }

    //   Razorpay.open(RazorpayOptions,callBack,failurecallBack)

    // }


    getTotal():void{
      console.log(this.values);

      let url = "http://localhost:8080/cart";
      this.modalCart.quantity1=this.values[0].quantity;
      this.modalCart.quantity2=this.values[1].quantity;
      this.modalCart.quantity3=this.values[2].quantity;
      //this.modalCart.quantity4=this.values[3].quantity;
      this.http.post<number>(url,this.values).subscribe(

        (res:any)=>{
          const numericResponse = parseFloat(res);
          // AppComponent.total=res;
          if(!isNaN(numericResponse)){

            sessionStorage.setItem('total',res.toString());
            this.total=numericResponse;
            this.totalAmount.setTotalAmount(numericResponse);
            this.totalAmount.setCartItems(this.model);
            //this.router.navigate(['/checkout']);
          }
          else{
            alert("Invalid response from the server");
          }



          //this.router.navigate(['/checkout']);
        },
        err=>{
          alert("Please select at least 1 item");
        }
      )

    }


  }







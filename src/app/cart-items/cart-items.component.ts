import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cart } from '../cart';
import { menu } from '../menu';
import { Quantity } from '../Quantity';
import { MenuComponent } from '../menu/menu.component';
import { TotalAmountService } from '../total-amount-service.service';



declare var Razorpay:any;

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {


  cartTotal: number = 0;
  total!: number;

  model:menu[] =[];
  values:Quantity[] = [];

  modalCart:{ [key:string] :number}={
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
cartItems: any;

  constructor(private http: HttpClient,private totalAmount: TotalAmountService) {
    const amountTotal = totalAmount.totalAmount$;
    console.log(amountTotal);
  }

  ngOnInit() {

    this.values = this.model.map(() => ({ quantity: 0 }));

    this.values.forEach((value, index) => {
      this.modalCart['quantity' + (index + 1)] = value.quantity;
    });
    // Fetch cart items from the cart service.
    this.getCartItems();

    this.totalAmount.totalAmount$.subscribe(totalAmount =>{
      this.total =totalAmount;
      console.log(this.total);
    });

    this.totalAmount.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
      this.calculateCartTotal();
    });

  }
  getCartItems() {
    const apiUrl = 'http://localhost:8080/getCartItems'; // Replace with your actual API URL
    return this.http.get(apiUrl);
    //this.calculateCartTotal();
  }

  calculateCartTotal() {
    this.cartTotal = this.cartItems.reduce(
      (total:number, item:any) => total + item.quantity * item.price,
      0
    );
  }

  // fetchCartItems() {
  //   this.getCartItems().subscribe((cartItems: Object) => {
  //     // Handle the response containing cart items
  //     console.log('Cart Items:', cartItems);
  //     // Update your component's cartItems property or perform other actions
  //     this.cartItems = cartItems;
  //     this.calculateCartTotal();
  //   });



payNow(){

  const RazorpayOptions ={
    description : 'Sample demo',
    currency: 'INR',
    amount:this.total *100,
    name: 'Athira KM',
    key :'rzp_test_QfBHdjnMkfiMdC',
    image:'',
    prefill:{
      name:'Athira KM',
      email:'athira@gmail.com',
      phone:'3212321234',

    },
    theme:{
      color:'#25d93a'
    },
    modal:{
      ondismiss:()=>{
        console.log('dismissed')
      }
    }


  }

  const callBack = (paymnetId : any) =>{

    console.log(paymnetId);

  }

  const failurecallBack = (e: any) =>{
    console.log(e);
  }

  Razorpay.open(RazorpayOptions,callBack,failurecallBack)

}
}

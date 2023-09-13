import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  private totalAmountSubject = new BehaviorSubject<number>(0);
  private cartItemsSubject = new BehaviorSubject<any[]>([]);


  totalAmount$ = this.totalAmountSubject.asObservable();
  cartItems$ = this.cartItemsSubject.asObservable();

  setTotalAmount(totalAmount: number) {
    this.totalAmountSubject.next(totalAmount);
  }

  setCartItems(cartItems: any[]) {
    this.cartItemsSubject.next(cartItems);
  }
}

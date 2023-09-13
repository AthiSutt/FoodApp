import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { MerchantMenuComponent } from './merchant-menu/merchant-menu.component';
//import { MenuComponent } from './menu/menu.component';
import { MerchantMenuComponent } from './merchant-menu/merchant-menu.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
//import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [

 { path: 'merchant-menu', component: MerchantMenuComponent },
 {path:  'cart-items', component: CartItemsComponent}
 //{ path: 'forgotPassword', component: ForgotPasswordComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

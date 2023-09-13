import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes,Router } from '@angular/router';
import { FormsModule,FormBuilder, Form } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { MerchantMenuComponent } from './merchant-menu/merchant-menu.component';
import { MerchantWelcomeComponent } from './merchant-welcome/merchant-welcome.component';
import { AddItemComponent } from './add-item/add-item.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { NgxPaginationModule } from 'ngx-pagination';
//import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



const appRoutes:Routes=[

  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'menu',component:MenuComponent},
  {path:'home',component:HomeComponent},
  {path:'merchantWelcome',component:MerchantWelcomeComponent},
  {path:'merchantMenu',component:MerchantMenuComponent},
  {path:'',component:HomeComponent},
  {path:'addItem',component:AddItemComponent},
  {path:  'cart-items', component: CartItemsComponent}



]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    MerchantMenuComponent,
    MerchantWelcomeComponent,
    AddItemComponent,
    WelcomeComponent,
    CartItemsComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes,{useHash:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

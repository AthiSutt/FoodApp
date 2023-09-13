import { Component, OnInit } from '@angular/core';
import { MenuServiceService } from '../menu-service.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Quantity } from '../Quantity';
import { menu } from '../menu';
import { merchantcart } from '../merchant-cart';


@Component({
  selector: 'app-merchant-menu',
  templateUrl: './merchant-menu.component.html',
  styleUrls: ['./merchant-menu.component.css']
})
export class MerchantMenuComponent implements OnInit{

  model:menu[]=[];

  modalCart:merchantcart={
    quantity1: 0,
    quantity2: 0,
    quantity3: 0,
    quantity4: 0,
    quantity5: 0,
    quantity6: 0,
    quantity7: 0,
    quantity8: 0,
    quantity9: 0
  };

  values:Quantity[] = [];

  itemsPerPage =4;
  //p: number = 1;
  currentPage: number = 1;

  constructor(private http:HttpClient, private router:Router,private menuService:MenuServiceService,
              public _DomSanitizationService: DomSanitizer ) { }

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
      this.model = men;
      for (let i=0;i<this.model.length;i++){
        this.values.push(new Quantity());
        this.values[i].quantity=0;
      }
    });
  }



  // changePage(page: number) {
  //   if (page >= 1 && page <= this.getTotalPages()) {
  //     this.currentPage = page;
  // }
  // }

  // getTotalPages() {
  //   return Math.ceil(this.model.length / this.itemsPerPage);
  // }

  // getPages() {
  //   const totalPages = this.getTotalPages();
  //   return Array.from({ length: totalPages }, (_, i) => i + 1);
  // }

  getCurrentPageItems() {
    // Calculate the range of items for the current page
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Return the sliced array of items for the current page
    return this.model.slice(startIndex, endIndex);
  }

  getTotal():void{
    let url = "http://localhost:8080/addToCart";
    this.modalCart.quantity1=this.values[0].quantity;
    this.modalCart.quantity2=this.values[1].quantity;
    this.modalCart.quantity3=this.values[2].quantity;
    this.http.post<number>(url,this.values).subscribe(
      res=>{
        this.ngOnInit();
      },
      err=>{
        alert("Error adding items to cart");
      }
    )

  }

  deleteMenuItem(id: string): void {
    const url = `http://localhost:8080/delete/${id}`;

    console.log('Delete button clicked for item with ID:', id);

    this.http.delete(url).subscribe(
      (response) => {
        // Item deleted successfully, update the menu
        this.getItems();
        alert('Item has been deleted successfully');
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }
}

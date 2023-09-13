package com.example.FoodApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Cart {
	
	 @Id
	    private int quantity1;
	    private int quantity2;
	    private int quantity3;
	    private int quantity4;
	    private int quantity5;
	    private int quantity6;
	    private int quantity7;
	    private int quantity8;
	    private int quantity9;
	    private int quantity10;
	    
	    
	    
	    
		public Cart() {
			
		}


		public Cart(int quantity1, int quantity2, int quantity3, int quantity4, int quantity5, int quantity6,
				int quantity7, int quantity8, int quantity9, int quantity10) {
			super();
			this.quantity1 = quantity1;
			this.quantity2 = quantity2;
			this.quantity3 = quantity3;
			this.quantity4 = quantity4;
			this.quantity5 = quantity5;
			this.quantity6 = quantity6;
			this.quantity7 = quantity7;
			this.quantity8 = quantity8;
			this.quantity9 = quantity9;
			this.quantity10 = quantity10;
		}
		
		
		
		public int getQuantity1() {
			return quantity1;
		}
		public void setQuantity1(int quantity1) {
			this.quantity1 = quantity1;
		}
		public int getQuantity2() {
			return quantity2;
		}
		public void setQuantity2(int quantity2) {
			this.quantity2 = quantity2;
		}
		public int getQuantity3() {
			return quantity3;
		}
		public void setQuantity3(int quantity3) {
			this.quantity3 = quantity3;
		}
		public int getQuantity4() {
			return quantity4;
		}
		public void setQuantity4(int quantity4) {
			this.quantity4 = quantity4;
		}
		public int getQuantity5() {
			return quantity5;
		}
		public void setQuantity5(int quantity5) {
			this.quantity5 = quantity5;
		}
		public int getQuantity6() {
			return quantity6;
		}
		public void setQuantity6(int quantity6) {
			this.quantity6 = quantity6;
		}
		public int getQuantity7() {
			return quantity7;
		}
		public void setQuantity7(int quantity7) {
			this.quantity7 = quantity7;
		}
		public int getQuantity8() {
			return quantity8;
		}
		public void setQuantity8(int quantity8) {
			this.quantity8 = quantity8;
		}
		public int getQuantity9() {
			return quantity9;
		}
		public void setQuantity9(int quantity9) {
			this.quantity9 = quantity9;
		}
		public int getQuantity10() {
			return quantity10;
		}
		public void setQuantity10(int quantity10) {
			this.quantity10 = quantity10;
		}
	    
	    
	    
	    
	    

}

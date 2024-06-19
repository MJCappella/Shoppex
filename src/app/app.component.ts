import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { ProductService } from './services/product.service'; //importing the service
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, CommonModule, ProductsComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShoppeX';
  registerObj: any = {
    "CustId": 0,
    "Name": "",
    "MobileNo": "",
    "Password": "",
  }

  loginObj: any = {
    "UserName": "",
    "UserPassword": "",
  }

  loggedObj: any = {};
  cartItems: any[] = [];
  loginModelClass: string = '';

  constructor(private productService: ProductService) {
    if(typeof window !== 'undefined'){
    const localData = localStorage.getItem('amazon_user');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
      this.getCartData(this.loggedObj.custId);
    }}
    this.productService.cartUpdated.subscribe((res: boolean)=>{
      if(res) {
        this.getCartData(this.loggedObj.custId)
      }
    })
    this.productService.showLogin.subscribe((res: boolean)=>{
      if(res) {
         this.loginModelClass = 'show';
      }
    })
  }

  getCartData(id: number) {
    this.productService.getAddtocartdataByCust(id).subscribe((res: any)=>{
      this.cartItems = res.data;
    })
  }

  onRegister() {
    this.productService.register(this.registerObj).subscribe((res: any)=> {
      if(res.result) {
        this.loggedObj = res.data;
        alert("User Creation Done")
      } else {
        alert(res.message)
      }
    })
  }

  onLogin() {
    this.productService.login(this.loginObj).subscribe((res: any)=> {
      if(res.result) {
        alert("User Login Success");
        this.loggedObj = res.data;
        this.loginModelClass = '';
        localStorage.setItem('amazon_user', JSON.stringify(res.data));
        this.getCartData(this.loggedObj.custId)
      } else {
        alert(res.message)
      }
    })
  }

  removeItem(cartId: number) {
    this.productService.removeProductFromCart(cartId).subscribe((res: any)=> {
      if(res.result) {
        alert("Item Removed");
        this.getCartData(this.loggedObj.custId)
      } else {
        alert(res.message)
      }
    })
  }

}

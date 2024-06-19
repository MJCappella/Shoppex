import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  loggedObj: any = {};
  cartItems: any[]= [];
  checkoutObj: any = {
    "SaleId": 0,
    "CustId": 0,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "",
    "DeliveryAddress1": "",
    "DeliveryAddress2": "",
    "DeliveryCity": "",
    "DeliveryPinCode": "",
    "DeliveryLandMark": ""
  }

  constructor(private productService: ProductService) {
    const localData = localStorage.getItem('amazon_user');
    if(localData != null) {
      const parseObj =  JSON.parse(localData);
      this.loggedObj = parseObj;
      this.getCartData(this.loggedObj.custId)
    }
  }

  ngOnInit(): void {

  }
  getCartData(id: number) {
    this.productService.getAddtocartdataByCust(id).subscribe((res: any)=>{
      this.cartItems = res.data;
    })
  }

  placeOrder() {
    this.checkoutObj.checkoutObj =  this.loggedObj.custId;
    this.productService.PlaceOrder(this.checkoutObj).subscribe((res: any)=> {
      if(res.result) {
        this.productService.cartUpdated.next(true);
        alert("Order Has Been Succefully Placed")
      } else {
        alert(res.message)
      }
    })
  }
}

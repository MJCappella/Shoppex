import { Component, OnInit } from '@angular/core';
import { Directive } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, NgClass], //add HttpClientModule incase you uncomment the import
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  productsArray: any[] = [];
  categories: any[] = [];
  selectedCategory: number = 0;
  loggedObj: any = {};

  constructor(private productService: ProductService) {
    const localData = localStorage.getItem('amazon_user');
    if(localData != null) {
      const parseObj =  JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategory();
  }

  loadProducts(){
     this.productService.getAllProducts().subscribe((Res: any)=>{
        this.productsArray = Res.data;
  })
}

  loadCategory(){
    this.productService.getAllCategory().subscribe((Res: any)=>{
       this.categories = Res.data;
    })
  }

  getAllProductsByCateogry(categoryId: number) {
    this.selectedCategory = categoryId;
    this.productService.getAllProductsByCateogry(categoryId).subscribe((Res: any) =>{
      this.productsArray = Res.data;
    })
  }

  addtocart(producId: number) {
    if(this.loggedObj.custId == undefined) {
      this.productService.showLogin.next(true);
    } else {
      const obj = {
        "CartId": 0,
        "CustId": this.loggedObj.custId,
        "ProductId": producId,
        "Quantity": 1,
        "AddedDate": new Date()
      }
      this.productService.addtoCart(obj).subscribe((res: any)=> {
        if(res.result) {
          alert("Product Added to Cart");
          this.productService.cartUpdated.next(true);
        } else {
          alert(res.message)
        }
      })
    }
    debugger;
}}

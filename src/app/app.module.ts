// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Approutes } from './app.routes'; // Import Approutes
import { HttpClient, HttpClientModule, withFetch} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    Approutes,// Use Approutes module
    HttpClientModule,
  ],
  providers: [HttpClientModule, HttpClient],
  bootstrap: []
})

export class AppModule { }

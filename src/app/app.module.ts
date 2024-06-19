// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Approutes } from './app.routes'; // Import Approutes
import { HttpClient, HttpClientModule, withFetch, provideHttpClient} from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    Approutes,// Use Approutes module
    HttpClientModule,
    RouterModule
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    provideHttpClient(withFetch())
  ],
  bootstrap: []
})

export class AppModule { }

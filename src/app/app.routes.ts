import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  {
    path:'products',
    component: ProductsComponent
  },
  {
    path:'checkout',
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class Approutes {}

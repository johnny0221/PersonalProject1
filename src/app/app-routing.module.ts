import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './landing/slider.component';
import { MainComponent } from './Chinesemain/main.component';
import { AboutComponent } from './aboutPage/about-main/about.component';
import { AboutCreateComponent } from './aboutPage/about-create/about-create.component';
import { ProductComponent } from './Product/product/product.component';
import { ProductMainComponent } from './Product/product-main/product-main.component';
import { ProductDessertsComponent } from './Product/product-desserts/product-desserts.component';
import { ProductCreateComponent } from './Product/product-create/product-create.component';
import { ProductTypeCreateComponent } from './Product/product-type-create/product-type-create.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductItemComponent } from './Product/product-item/product-item.component';
const routes: Routes = [
  { path: '', component: SliderComponent },
  { path: 'chinese', component: MainComponent },
  { path: 'chinese/about', component: AboutComponent },
  { path: 'people/create', component: AboutCreateComponent },
  { path: 'people/:id/edit', component: AboutCreateComponent },
  {
    path: 'chinese/product', component: ProductComponent, children: [
      { path: '', component: ProductMainComponent },
      { path: 'drinks', component: ProductDessertsComponent },
      { path: 'desserts', component: ProductDessertsComponent },
      { path: 'lightmeals', component: ProductDessertsComponent },
      { path: ':id', component: ProductItemComponent }
    ]
  },
  {
    path: 'product/create', component: ProductCreateComponent
  },
  { path: 'product/:id/edit', component: ProductCreateComponent },
  { path: 'ingredient/create', component: ProductTypeCreateComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: ':id/cart', component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

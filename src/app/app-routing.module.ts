import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './landing/slider.component';
import { MainComponent } from './MainPage/main.component';
import { AboutComponent } from './aboutPage/about-main/about.component';
import { AboutCreateComponent } from './aboutPage/about-create/about-create.component';
import { ProductComponent } from './Product/product/product.component';
import { ProductMainComponent } from './Product/product-main/product-main.component';
import { ProductDessertsComponent } from './Product/product-desserts/product-desserts.component';
import { ProductCreateComponent } from './Product/product-create/product-create.component';
import { ProductTypeCreateComponent } from './Product/product-type-create/product-type-create.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ShoppingCartComponent } from './ShoppingCartPage/shopping-cart.component';
import { ProductItemComponent } from './Product/product-item/product-item.component';
import { ContactPageComponent } from './ContactPage/contact-page.component';
import { ForgetComponent } from './PasswordResetPage/forget/forget.component';
import { ResetComponent } from './PasswordResetPage/reset/reset.component';
const routes: Routes = [
  { path: '', component: SliderComponent },
  { path: 'chinese', component: MainComponent, data: { depth: 1 } },
  { path: 'chinese/about', component: AboutComponent, data: { depth: 2 } },
  { path: 'people/create', component: AboutCreateComponent },
  { path: 'people/:id/edit', component: AboutCreateComponent },
  {
    path: 'chinese/product', component: ProductComponent, data: { depth: 2 }, children: [
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
  { path: ':id/cart', component: ShoppingCartComponent, data: { depth: 2 } },
  { path: 'contact', component: ContactPageComponent, data: { depth: 2 } },
  { path: 'forget', component: ForgetComponent },
  { path: 'reset/:token', component: ResetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

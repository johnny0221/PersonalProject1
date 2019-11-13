import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './landing/slider.component';
import { MainComponent } from './Chinesemain/main.component';
import { AboutComponent } from './aboutPage/about-main/about.component';
import { AboutCreateComponent } from './aboutPage/about-create/about-create.component';
import { ProductComponent } from './Product/product/product.component';
import { ProductMainComponent } from './Product/product-main/product-main.component';
import { ProductDrinksComponent } from './Product/product-drinks/product-drinks.component';
import { ProductDessertsComponent } from './Product/product-desserts/product-desserts.component';
import { ProductLightMealComponent } from './Product/product-light-meal/product-light-meal.component';
import { ProductCreateComponent } from './Product/product-create/product-create.component';
const routes: Routes = [
  { path: '', component: SliderComponent },
  { path: 'chinese', component: MainComponent },
  { path: 'chinese/about', component: AboutComponent },
  { path: 'people/create', component: AboutCreateComponent },
  { path: 'people/:id/edit', component: AboutCreateComponent },
  {
    path: 'chinese/product', component: ProductComponent, children: [
      { path: '', component: ProductMainComponent },
      { path: 'drinks', component: ProductDrinksComponent },
      { path: 'desserts', component: ProductDessertsComponent },
      { path: 'lightmeals', component: ProductLightMealComponent }
    ]
  },
  {
    path: 'product/create', component: ProductCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

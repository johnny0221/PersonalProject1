import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { SliderComponent } from './landing/slider.component';
import { MainComponent } from './Chinesemain/main.component';
import { AboutComponent } from './aboutPage/about-main/about.component';
import { FooterComponent } from './share/footer/footer.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AboutCreateComponent } from './aboutPage/about-create/about-create.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ProductMainComponent } from './Product/product-main/product-main.component';
import { ProductDrinksComponent } from './Product/product-drinks/product-drinks.component';
import { ProductDessertsComponent } from './Product/product-desserts/product-desserts.component';
import { ProductLightMealComponent } from './Product/product-light-meal/product-light-meal.component';
import { ProductComponent } from './Product/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    MainComponent,
    AboutComponent,
    FooterComponent,
    AboutCreateComponent,
    ConfirmComponent,
    ProductMainComponent,
    ProductDrinksComponent,
    ProductDessertsComponent,
    ProductLightMealComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmComponent]
})
export class AppModule { }

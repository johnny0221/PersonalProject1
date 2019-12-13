import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ConfirmComponent } from './confirm-dialog/confirm.component';
import { ProductMainComponent } from './Product/product-main/product-main.component';
import { ProductDessertsComponent } from './Product/product-desserts/product-desserts.component';
import { ProductComponent } from './Product/product/product.component';
import { ProductCreateComponent } from './Product/product-create/product-create.component';
import { ProductCardComponent } from './Product/product-card/product-card.component';
import { ProductTypeCreateComponent } from './Product/product-type-create/product-type-create.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth.Interceptor';
import { errorInterceptor } from './error.interceptor';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductItemComponent } from './Product/product-item/product-item.component';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

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
    ProductDessertsComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductCardComponent,
    ProductTypeCreateComponent,
    SignupComponent,
    LoginComponent,
    ErrorDialogComponent,
    ShoppingCartComponent,
    ProductItemComponent,
    CommentDialogComponent,
    CartDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmComponent,
    ErrorDialogComponent,
    CommentDialogComponent,
    CartDialogComponent
  ]
})
export class AppModule { }

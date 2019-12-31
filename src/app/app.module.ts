import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shareComponent/template/navbar.component';
import { SliderComponent } from './landing/slider.component';
import { MainComponent } from './MainPage/main.component';
import { AboutComponent } from './aboutPage/about-main/about.component';
import { FooterComponent } from './shareComponent/footer/footer.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AboutCreateComponent } from './aboutPage/about-create/about-create.component';
import { ConfirmComponent } from './CustomDialogs/confirm-dialog/confirm.component';
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
import { ErrorDialogComponent } from './CustomDialogs/error-dialog/error-dialog.component';
import { ShoppingCartComponent } from './ShoppingCartPage/shopping-cart.component';
import { ProductItemComponent } from './Product/product-item/product-item.component';
import { CommentDialogComponent } from './CustomDialogs/comment-dialog/comment-dialog.component';
import { CartDialogComponent } from './CustomDialogs/cart-dialog/cart-dialog.component';
import { ContactPageComponent } from './ContactPage/contact-page.component';
import { ForgetComponent } from './PasswordResetPage/forget/forget.component';
import { ResetComponent } from './PasswordResetPage/reset/reset.component';
import { MainFeatureComponent } from './MainPage/main-feature/main-feature.component';
import { MainProductComponent } from './MainPage/main-product/main-product.component';

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
    ContactPageComponent,
    ForgetComponent,
    ResetComponent,
    MainFeatureComponent,
    MainProductComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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

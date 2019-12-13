import { Component, OnInit } from '@angular/core';
import { authService } from '../auth/auth.service';
import { ProductService } from '../Product/product.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private username;
  private userid;
  private randomData: Observable<Array<any>>;
  private notauthenticated = "notauthenticated";

  constructor(private authService: authService, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.randomData = this.productService.getRandomProduct();
    this.userid = this.authService.getUserId();
    console.log(this.userid);
    console.log(this.username);
  }

  toAbout() {
    this.router.navigate([`/chinese/about`]);
  }

  toProduct() {
    this.router.navigate([`/chinese/product`]);
  }

  toItemPage(id: string) {
    this.router.navigate([`/chinese/product/${id}`])
  }

  toCart() {
    this.router.navigate([`${this.userid}/cart`]);
  }

}

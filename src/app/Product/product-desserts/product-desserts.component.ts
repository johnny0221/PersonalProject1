import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductModel } from '../../Interfaces/product.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-desserts',
  templateUrl: './product-desserts.component.html',
  styleUrls: ['./product-desserts.component.scss']
})
export class ProductDessertsComponent implements OnInit {

  dessertInfo: ProductModel[] = [];
  productSub: Subscription;
  routeName: string = this.router.url.substring(17);
  routeLink: string;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productSub = this.productService.ProductDataSubListener().subscribe((data) => {
      this.dessertInfo = data;
    });
    this.getProduct();
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

  //helper method to decide which kind of data to get back.
  getProduct() {
    if (this.router.url.includes('desserts')) {
      this.productService.getDessertProduct();
      this.routeLink = '甜點';
    }
    else if (this.router.url.includes('drinks')) {
      this.productService.getDrinkProduct();
      this.routeLink = '飲料';
    }
    else if (this.router.url.includes('lightmeals')) {
      this.productService.getLightmealProduct();
      this.routeLink = '輕食';
    }
  }

}

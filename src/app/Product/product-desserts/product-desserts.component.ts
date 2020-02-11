import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductService } from '../product.service';
import { ProductModel } from '../../Interfaces/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-desserts',
  templateUrl: './product-desserts.component.html',
  styleUrls: ['./product-desserts.component.scss']
})
export class ProductDessertsComponent implements OnInit {

  public dessertInfo: ProductModel[] = [];
  private productSub: Subscription;
  public routeLink: string;
  public form: FormGroup;
  @ViewChild('search', { static: false }) search: ElementRef;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private Location: Location,
    @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {
    this.initForm();
    this.productSub = this.productService.ProductDataSubListener().subscribe((data) => {
      this.dessertInfo = data;
    });
    this.getProduct();
  }

  ngAfterViewInit() {
    let type = "";
    if (isPlatformBrowser(this.platformId)) {
      type = this.Location.path().slice(9);
    }
    fromEvent(this.search.nativeElement, 'input')
      .pipe(
        map((data: any) => {
          return data.target.value;
        }),
        switchMap((data) => {
          return this.productService.searchItem(data, type);
        })
      )
      .subscribe((data) => {
        let ProductData = data.product;
        this.productService.productDataSub.next([...ProductData]);
      })

  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

  initForm() {
    this.form = new FormGroup({
      'search': new FormControl(null, { validators: [Validators.required] })
    })
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

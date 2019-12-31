import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.scss']
})
export class MainProductComponent implements OnInit {

  @Input() product;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.product);
  }

  toItemPage(id: string) {
    this.router.navigate([`/chinese/product/${id}`])
  }

}

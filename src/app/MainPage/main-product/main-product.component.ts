import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainProductComponent implements OnInit {

  @Input() product;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  toItemPage(id: string) {
    this.router.navigate([`product/${id}`])
  }

}

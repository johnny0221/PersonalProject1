import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}

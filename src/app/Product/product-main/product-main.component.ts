import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { authService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit {

  constructor(private router: Router, private authService: authService) { }

  public adminStatus: Observable<boolean>;

  ngOnInit() {
    this.adminStatus = this.authService.getAdminStatus()
  }

}

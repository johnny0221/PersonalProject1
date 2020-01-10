import { Component, OnInit, OnDestroy } from '@angular/core';
import { authService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authService: authService, private router: Router) { }
  public opened: boolean = false;
  private userid: string;
  public isUserAuthenticated: boolean = false;
  private authStatusListener: Subscription;


  ngOnInit() {
    this.authStatusListener = this.authService.getAuthStatus().subscribe(
      (isAuthenticated) => {
        if (isAuthenticated === true) {
          this.isUserAuthenticated = true;
          this.userid = this.authService.getUserId();
        }
      }
    )
  }

  logout() {
    this.authService.logout();
  }

  toCart() {
    this.router.navigate([`/cart/${this.userid}`]);
  }

  ngOnDestroy() {
    this.isUserAuthenticated = false;
    this.authStatusListener.unsubscribe();
  }

}

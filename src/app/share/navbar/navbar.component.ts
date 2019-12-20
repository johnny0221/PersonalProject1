import { Component, OnInit, OnDestroy } from '@angular/core';
import { authService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authService: authService) { }
  private i;
  isUserAuthenticated = false;
  private authStatusListener: Subscription;


  ngOnInit() {
    this.authStatusListener = this.authService.getAuthStatus().subscribe(
      (isAuthenticated) => {
        console.log(isAuthenticated);
        if (isAuthenticated === true) {
          this.isUserAuthenticated = true;
        }
      }
    )
  }

  toggle() {
    this.i = !this.i;
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.isUserAuthenticated = false;
    this.authStatusListener.unsubscribe();
  }

}

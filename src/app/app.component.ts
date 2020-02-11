import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { authService } from './auth/auth.service';
import { Router } from '@angular/router';

import { trigger, transition, group, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('1 => *, 2 => *, 3 => *, 4 => *, 5 => *, 6 => *, 7 => *', [
        query(':enter', style({ transform: "translateX(100%)" })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' })),
        group([
          query(':leave', [
            animate('1s cubic-bezier(.35,0,.25,1)', style({ transform: "translateX(-100%)" })),
          ]),
          // and now reveal the enter
          query(':enter', animate('1s cubic-bezier(.35,0,.25,1)', style({ transform: "translateX(0)" }))),
        ])
      ]),
      // transition('2 => 1', [
      //   query(':enter', style({ transform: "translateX(-100%)" })),
      //   query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, width: '100%' })),
      //   group([
      //     query(':leave', [
      //       animate('1s cubic-bezier(.35,0,.25,1)', style({ transform: "translateX(100%)" })),
      //     ]),
      //     // and now reveal the enter
      //     query(':enter', animate('1s cubic-bezier(.35,0,.25,1)', style({ transform: "translateX(0)" }))),
      //   ])
      // ])
    ])
  ]
})
export class AppComponent implements OnInit {

  constructor(
    private authService: authService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.autoLogin();
    }
  }

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }

}

import { Component, OnInit } from '@angular/core';
import { authService } from './auth/auth.service';
import { Router, ActivatedRoute, } from '@angular/router';

import { trigger, transition, group, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('1 <=> 2', [
        style({ height: '!' }),
        query(':enter', style({ opacity: 0 })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0 })),
        group([
          query(':leave', [
            animate('3s cubic-bezier(.35,0,.25,1)', style({ opacity: 0 })),
          ]),
          // and now reveal the enter
          query(':enter', animate('3s cubic-bezier(.35,0,.25,1)', style({ opacity: 1 }))),

        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  constructor(private authService: authService, private router: Router, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authService.autoLogin();
  }

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }

}

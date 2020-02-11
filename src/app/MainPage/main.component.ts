import { Component, OnInit, ViewChild, Renderer2, AfterViewInit, ElementRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { authService } from '../auth/auth.service';
import { ProductService } from '../Product/product.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private username: string;
  private counter: number = 1;
  public userid: string;
  public randomData: Observable<Array<any>>;
  public notauthenticated: string = "notauthenticated";
  private autoanimate: ReturnType<typeof setInterval>;
  @ViewChild('slider', { static: false }) slider: ElementRef;

  constructor(
    private authService: authService,
    private productService: ProductService,
    private router: Router,
    private renderer: Renderer2,
    private elem: ElementRef,
    @Inject(PLATFORM_ID) private platformId) { }




  ngOnInit() {
    this.username = this.authService.getUsername();
    this.randomData = this.productService.getRandomProduct();
    this.userid = this.authService.getUserId();
  }

  //carousel function start
  // ngAfterViewInit() {
  //   this.renderer.setStyle(this.slider.nativeElement, 'transition', 'all .5s');
  //   this.renderer.setStyle(this.slider.nativeElement, 'transform', `translateX(-100%)`);
  // }

  // next() {
  //   let elements = this.elem.nativeElement.querySelectorAll(".carousel__photo");
  //   //prevent user from clicking when the coutner exceed.
  //   if (this.counter >= elements.length - 1) return;
  //   this.renderer.setStyle(this.slider.nativeElement, 'transition', 'all .4s');
  //   this.counter++;
  //   this.renderer.setStyle(this.slider.nativeElement, 'transform', `translateX(${-100 * this.counter}%)`);
  // }

  // previous() {
  //   //prevent user from clicking when the coutner exceed.
  //   if (this.counter <= 0) return;
  //   this.renderer.setStyle(this.slider.nativeElement, 'transition', 'all .4s');
  //   this.counter--;
  //   this.renderer.setStyle(this.slider.nativeElement, 'transform', `translateX(${-100 * this.counter}%)`);
  // }

  // transitioned() {
  //   let elements = this.elem.nativeElement.querySelectorAll(".carousel__photo");
  //   if (elements[this.counter].id === "lastclone") {
  //     this.renderer.setStyle(this.slider.nativeElement, 'transition', 'none');
  //     this.counter = elements.length - 2;
  //     this.renderer.setStyle(this.slider.nativeElement, 'transform', `translateX(${-100 * this.counter}%)`);
  //   }
  //   if (elements[this.counter].id === "firstclone") {
  //     this.renderer.setStyle(this.slider.nativeElement, 'transition', 'none');
  //     this.counter = elements.length - this.counter;
  //     this.renderer.setStyle(this.slider.nativeElement, 'transform', `translateX(${-100 * this.counter}%)`);
  //   }

  // }
  //carousel function end

  toAbout() {
    this.router.navigate([`/about`]);
  }

  toProduct() {
    this.router.navigate([`/product`]);
  }

  toContact() {
    this.router.navigate([`/contact`]);
  }

  toItemPage(id: string) {
    this.router.navigate([`/chinese/product/${id}`])
  }

  toCart() {
    this.router.navigate([`cart/${this.userid}`]);
  }

  ngOnDestroy() {

  }

}

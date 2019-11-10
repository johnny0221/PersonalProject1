import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLightMealComponent } from './product-light-meal.component';

describe('ProductLightMealComponent', () => {
  let component: ProductLightMealComponent;
  let fixture: ComponentFixture<ProductLightMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLightMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLightMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDrinksComponent } from './product-drinks.component';

describe('ProductDrinksComponent', () => {
  let component: ProductDrinksComponent;
  let fixture: ComponentFixture<ProductDrinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDrinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

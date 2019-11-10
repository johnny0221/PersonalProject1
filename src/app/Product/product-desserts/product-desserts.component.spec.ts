import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDessertsComponent } from './product-desserts.component';

describe('ProductDessertsComponent', () => {
  let component: ProductDessertsComponent;
  let fixture: ComponentFixture<ProductDessertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDessertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDessertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

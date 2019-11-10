import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCreateComponent } from './about-create.component';

describe('AboutCreateComponent', () => {
  let component: AboutCreateComponent;
  let fixture: ComponentFixture<AboutCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedCouponsComponent } from './purchased-coupons.component';

describe('PurchasedCouponsComponent', () => {
  let component: PurchasedCouponsComponent;
  let fixture: ComponentFixture<PurchasedCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

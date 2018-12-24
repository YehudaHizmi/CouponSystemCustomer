import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsChartComponent } from './coupons-chart.component';

describe('CouponsChartComponent', () => {
  let component: CouponsChartComponent;
  let fixture: ComponentFixture<CouponsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMainAreaComponent } from './customer-main-area.component';

describe('CustomerMainAreaComponent', () => {
  let component: CustomerMainAreaComponent;
  let fixture: ComponentFixture<CustomerMainAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMainAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMainAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

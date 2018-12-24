import { TestBed, inject } from '@angular/core/testing';

import { WebApiCustomerService } from './web-api-customer.service';

describe('WebApiCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebApiCustomerService]
    });
  });

  it('should be created', inject([WebApiCustomerService], (service: WebApiCustomerService) => {
    expect(service).toBeTruthy();
  }));
});

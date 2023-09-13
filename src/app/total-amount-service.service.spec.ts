import { TestBed } from '@angular/core/testing';

import { TotalAmountServiceService } from './total-amount-service.service';

describe('TotalAmountServiceService', () => {
  let service: TotalAmountServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalAmountServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

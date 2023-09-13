import { TestBed } from '@angular/core/testing';

import { AddcartServiceService } from './addcart-service.service';

describe('AddcartServiceService', () => {
  let service: AddcartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AddNewItemServiceService } from './add-new-item-service.service';

describe('AddNewItemServiceService', () => {
  let service: AddNewItemServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewItemServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

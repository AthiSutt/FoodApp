import { TestBed,async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuServiceService } from './menu-service.service';

describe('MenuServiceService', () => {
  let service: MenuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CorporateregisterService } from './corporateregister.service';

describe('CorporateregisterService', () => {
  let service: CorporateregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

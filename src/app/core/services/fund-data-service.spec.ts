import { TestBed } from '@angular/core/testing';

import { FundDataService } from './fund-data-service';

describe('FundDataService', () => {
  let service: FundDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

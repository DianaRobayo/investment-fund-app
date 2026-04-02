import { TestBed } from '@angular/core/testing';

import { ListFundService } from './list-fund-service';

describe('ListFundService', () => {
  let service: ListFundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListFundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

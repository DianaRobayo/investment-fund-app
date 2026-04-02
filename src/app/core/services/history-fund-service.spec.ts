import { TestBed } from '@angular/core/testing';

import { HistoryFundService } from './history-fund-service';

describe('HistoryFundService', () => {
  let service: HistoryFundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryFundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

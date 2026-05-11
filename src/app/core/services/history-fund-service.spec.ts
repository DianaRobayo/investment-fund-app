import { TestBed } from '@angular/core/testing';

import { HistoryFundService } from './history-fund-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('HistoryFundService', () => {
  let service: HistoryFundService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideZonelessChangeDetection(),
        provideHttpClient(),
      ]
    });
    service = TestBed.inject(HistoryFundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

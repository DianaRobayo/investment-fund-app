import { TestBed } from '@angular/core/testing';

import { FundDataService } from './fund-data-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('FundDataService', () => {
  let service: FundDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideZonelessChangeDetection(),
        provideHttpClient(),
      ]
    });
    service = TestBed.inject(FundDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

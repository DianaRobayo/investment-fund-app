import { TestBed } from '@angular/core/testing';

import { ListFundService } from './list-fund-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('ListFundService', () => {
  let service: ListFundService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideZonelessChangeDetection(),
        provideHttpClient(),
      ]
    });
    service = TestBed.inject(ListFundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFunds } from './investment-funds';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('InvestmentFunds', () => {
  let component: InvestmentFunds;
  let fixture: ComponentFixture<InvestmentFunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentFunds],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InvestmentFunds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

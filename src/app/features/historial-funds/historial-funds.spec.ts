import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialFunds } from './historial-funds';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('HistorialFunds', () => {
  let component: HistorialFunds;
  let fixture: ComponentFixture<HistorialFunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialFunds],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialFunds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

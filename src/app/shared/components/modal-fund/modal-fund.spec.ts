import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFund } from './modal-fund';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ModalFund', () => {
  let component: ModalFund;
  let fixture: ComponentFixture<ModalFund>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFund],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalFund);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', async () => {
    await fixture.whenStable();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(component.data.row.nameFund);
  });
});

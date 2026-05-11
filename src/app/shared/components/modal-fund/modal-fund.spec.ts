import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFund } from './modal-fund';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ModalFund', () => {
  let component: ModalFund;
  let fixture: ComponentFixture<ModalFund>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ModalFund>>;

  beforeEach(async () => {

    // Se crea un mock para los datos que se pasan al modal a través de MAT_DIALOG_DATA
    const dialogDataMock = {
      id: '1',
      row: {
        id: '1',
        idUser: 'FZn3eAOPqyU',
        idFund: 1,
        nameFund: 'Fondo Test',
        quantityFund: 1,
      },
      currentAmount: 100000,
      listFunds: [
        { idFund: 1, nameFund: 'Fondo Test', minAmount: 1000, category: 'FPV' }
      ],
      type: 'add'
    };

    // Spy de modal para simular el comportamiento del MatDialogRef.
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<ModalFund>>(
      'MatDialogRef',
      ['close', 'addPanelClass'],
      { disableClose: false }
    );

    await TestBed.configureTestingModule({
      imports: [ModalFund],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    }).compileComponents();

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

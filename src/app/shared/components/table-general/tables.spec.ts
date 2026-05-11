import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGeneral } from './table-general';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Tables', () => {
  let component: TableGeneral;
  let fixture: ComponentFixture<TableGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableGeneral],
      providers:[
        provideZonelessChangeDetection(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableGeneral);
    component = fixture.componentInstance;

    // Como la cols y rows son inputs requeridas
    // entonces se les asigna un valor para evitar errores en la vista
    // al momento de crear el componente
    fixture.componentRef.setInput('columns', [
      { field: 'nameFund', title: 'Fondo' },
      { field: 'quantityFund', title: 'Unidades', isCurrency: false }
    ]);
    fixture.componentRef.setInput('rows', [
      { nameFund: 'Fondo Test', quantityFund: 10 }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

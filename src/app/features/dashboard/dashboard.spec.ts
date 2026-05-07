import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, provideZonelessChangeDetection, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { FundDataService } from '../../core/services/fund-data-service';
import { of, throwError } from 'rxjs';
import { RelationUserFund } from '../../shared/models/relationUserFund';
import { ListFundService } from '../../core/services/list-fund-service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let fundDataServiceSpy: jasmine.SpyObj<FundDataService>;
  let listFundServiceSpy: jasmine.SpyObj<ListFundService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {

    // Se crean los spies para los servicios utilizados en el componente
    // y se deben agregar todas las señales, servicios que se utilicen
    fundDataServiceSpy = jasmine.createSpyObj<FundDataService>(
      'FundDataService',
      ['getFundByIdUser', 'updateAvailable', 'getTotalInvested'],
      {
        available: signal(1000),
        currentValue: signal(0)
      }
    );

    listFundServiceSpy = jasmine.createSpyObj<ListFundService>(
      'ListFundService',
      ['getListFunds']
    );
    fundDataServiceSpy.getFundByIdUser.and.returnValue(of([]));
    listFundServiceSpy.getListFunds.and.returnValue(of([]));


    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: FundDataService, useValue: fundDataServiceSpy },
        { provide: ListFundService, useValue: listFundServiceSpy },
        // { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard); //Se crea la instancia del componente Dashboard
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /*************************    Template tests   ****************************/
  it('should contain "Listado de fondos de inversión"', () => {
    fixture.detectChanges(); //Se detectan los cambios para que se actualice la vista con los datos del componente
    const dashboardElement: HTMLElement = fixture.nativeElement;
    expect(dashboardElement.textContent).toContain('fondos de inversión');
  });

  it('should find the <p> with fixture.debugElement.nativeElement', () => {
    fixture.detectChanges(); //Se detectan los cambios para que se actualice la vista con los datos del componente
    const dashboardDe: DebugElement = fixture.debugElement;
    const dashboardEl: HTMLElement = dashboardDe.nativeElement;
    const p = dashboardEl.querySelector('p')!;
    //Se valida que el parrafo no este nulo y se elimina espacios en el string.
    expect(p).not.toBeNull();
    expect(p.textContent.trim()).toContain('fondos de inversión');
  });

  /******************    Methods and services tests   **********************/
  it('search list users by fund', () => {
    const service = TestBed.inject(FundDataService);
    const relation: RelationUserFund[] = [
      { id: '1', idUser: 'FZn3eAOPqyU', idFund: 1, quantityFund: 2 },
      { id: '2', idUser: 'FZn3eAOPqyU', idFund: 3, quantityFund: 5 }
    ];

    // Spy para simular el método del servicio
    // Llama el servicio y retorna el arreglo
    fundDataServiceSpy.getFundByIdUser.and.returnValue(of(relation));
    // Llama el metodo
    spyOn(component, 'getListFunds');

    component.getDataUserFunds();

    // Para la señal relationUserFund, se agrega el arreglo de relación de fondos y usuarios
    expect(component.relationUserFund()).toEqual(relation);

    //Se le envia al metodo getListFunds los ids de fondos asociados al usuario
    expect(component.getListFunds).toHaveBeenCalledWith([1, 3]);
  });

  // Verifica mensaje error del metodo getDataUserFunds
  it('getDataUserFunds should handle service error', () => {
    //Primero se llama el Swal.fire por medio del spy
    const swalSpy = spyOn(Swal, 'fire').and.stub();

    fundDataServiceSpy.getFundByIdUser.and.returnValue(
      throwError(() => new Error('fallo API'))
    );
    component.getDataUserFunds();

    expect(fundDataServiceSpy.getFundByIdUser).toHaveBeenCalled();

    //Verificar que Swal.fire fue llamado con los parámetros esperados
    expect(swalSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Error',
        icon: 'error'
      })
    );
  });
});

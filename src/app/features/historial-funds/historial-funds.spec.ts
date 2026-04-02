import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialFunds } from './historial-funds';

describe('HistorialFunds', () => {
  let component: HistorialFunds;
  let fixture: ComponentFixture<HistorialFunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialFunds]
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

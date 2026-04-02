import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGeneral } from './table-general';

describe('Tables', () => {
  let component: TableGeneral;
  let fixture: ComponentFixture<TableGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableGeneral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableGeneral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

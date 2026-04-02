import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFund } from './modal-fund';

describe('ModalFund', () => {
  let component: ModalFund;
  let fixture: ComponentFixture<ModalFund>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFund]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFund);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

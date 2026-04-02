import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFunds } from './investment-funds';

describe('InvestmentFunds', () => {
  let component: InvestmentFunds;
  let fixture: ComponentFixture<InvestmentFunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentFunds]
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

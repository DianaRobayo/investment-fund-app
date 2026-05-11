import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buttons } from './buttons';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Buttons', () => {
  let component: Buttons;
  let fixture: ComponentFixture<Buttons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buttons],
      providers:[
        provideZonelessChangeDetection(),

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Buttons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

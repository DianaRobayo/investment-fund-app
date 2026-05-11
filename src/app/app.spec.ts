import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(App); // Crea el componente
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize title signal', () => {
    // Instancia la señal title del componente App y como la señal esta protegida
    // Se accede a ella a través de una función anónima que se le asigna a la variable app
    const app = fixture.componentInstance as App & { title: () => string };
    expect(app.title()).toBe('fondos-app');
  });

});

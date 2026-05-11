import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detected signal menu mobile', () => {
    expect(component.isMobileMenuOpen()).toBeFalse();
  });

  it('should toggle mobile menu when toggleMobileMenu is called', () => {
    // Estado inicial de la señal
    expect(component.isMobileMenuOpen()).toBe(false);

    // Llamar al método
    component.toggleMobileMenu();

    // Validar que cambió a true
    expect(component.isMobileMenuOpen()).toBe(true);

    // Llamar nuevamente para cerrar
    component.toggleMobileMenu();

    // Validar que volvió a false
    expect(component.isMobileMenuOpen()).toBe(false);
  });


  /************************ TEMPLATE ************************/
  it('should call toggleMobileMenu when button is clicked', () => {
    // Se llama el metodo del onclick
    spyOn(component, 'toggleMobileMenu');
    fixture.detectChanges();

    // Encontrar el botón del menú (id="button-menu")
    const button = fixture.nativeElement.querySelector('button[id="button-menu"]');

    // Simular el clic
    button.click();

    // Validar que el método fue llamado
    expect(component.toggleMobileMenu).toHaveBeenCalled();
  });

  it('should toggle mobile menu visibility on button click', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[id="button-menu"]') as HTMLButtonElement;
    const menu = fixture.nativeElement.querySelector('ul') as HTMLUListElement;

    // Primer clic: abrir menú
    button.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(true);
    expect(menu.classList.contains('hidden')).toBe(false);
    expect(menu.classList.contains('flex')).toBe(true);

    // Segundo clic: cerrar menú
    button.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(false);
    expect(menu.classList.contains('hidden')).toBe(true);
    expect(menu.classList.contains('flex')).toBe(false);
  });
});

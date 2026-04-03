import { Component, effect, inject, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CurrencyPipe } from '@angular/common';
import { FundDataService } from '../../core/services/fund-data-service';
import { UserService } from '../../core/services/user-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  imports: [Navbar, CurrencyPipe],
  templateUrl: './header.html',
  styleUrl: './header.sass',
})
export class Header {

  protected readonly userName = signal<string>('');
  readonly currentAmount = signal<number>(0);
  readonly totalInvested = signal<number>(0);
  private userService = inject(UserService);
  fundDataService = inject(FundDataService);

  constructor() {
    this.getUser();
    effect(() => {
      this.totalInvested.set(this.fundDataService.currentValue());
    });
  }

  /***
   * Metodo para obtener el nombre del usuario, a nivel de prueba se
   * utiliza un ID fijo
   **/
  getUser() {
    this.userService.getUserById('FZn3eAOPqyU').subscribe({
      next: (res) => {
        if (res) {
          const dataUser = res[0];
          if (dataUser) {
            this.userName.set(`${dataUser.userName} ${dataUser.lastName}`);
            this.currentAmount.set(500000);
          } else {
            this.userName.set('');
            this.currentAmount.set(0);
            Swal.fire({
              title: 'Error',
              text: 'Por favor, crear tu usuario.',
              icon: 'error'
            });
          }
        }
      }, error: (error) => {
        this.userName.set('');
        this.currentAmount.set(0);

        Swal.fire({
          title: 'Error',
          text: `No se pudo cargar la información del usuario por ${error}`,
          icon: 'error'
        });
      }
    });
  }

}

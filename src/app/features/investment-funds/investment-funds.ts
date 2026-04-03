import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { TableGeneral } from '../../shared/components/table-general/table-general';
import { ListFundService } from '../../core/services/list-fund-service';
import { ListFunds } from '../../shared/models/listFunds';
import Swal from 'sweetalert2';
import { Footer } from "../../layout/footer/footer";


@Component({
  selector: 'app-investment-funds',
  imports: [
    Navbar,
    TableGeneral,
    Footer
],
  templateUrl: './investment-funds.html',
  styleUrl: './investment-funds.sass',
})
export class InvestmentFunds {

  readonly columns = signal([
    { field: 'idFund', title: 'ID' },
    { field: 'nameFund', title: 'Nombre del fondo' },
    { field: 'category', title: 'Categoría' },
    { field: 'minAmount', title: 'Monto mínimo', isCurrency: true }
  ]);

  listFundsService = inject(ListFundService);
  readonly listFunds = signal<ListFunds[]>([]);

  constructor() {
    this.getListFunds();
  }

  /***
   * Lista de fondos de inversión
   **/
  getListFunds(): void {
    this.listFundsService.getListFunds().subscribe({
      next: (res) => {
        this.listFunds.set(res);

      }, error: (error) => {
        this.listFunds.set([]);
        Swal.fire({
          title: 'Error',
          text: `Se presento error ${error} al cargar el listado de fondos.`,
          icon: 'error'
        });
      }
    });
  }

}

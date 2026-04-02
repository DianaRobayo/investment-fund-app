import { Component, inject, signal } from '@angular/core';
import { TableGeneral } from "../../shared/components/table-general/table-general";
import { HistoryFundService } from '../../core/services/history-fund-service';
import { HistoryFund } from '../../shared/models/historyFund';
import { Navbar } from "../../layout/navbar/navbar";

@Component({
  selector: 'app-historial-funds',
  imports: [TableGeneral, Navbar],
  templateUrl: './historial-funds.html',
  styleUrl: './historial-funds.sass',
})
export class HistorialFunds {

  readonly columns = signal([
    { field: 'nameFund', title: 'Nombre del fondo' },
    { field: 'unitsFund', title: 'Unidades agregadas' },
    { field: 'amountFund', title: 'Total de suscripción' },
    { field: 'date', title: 'Fecha' },
    { field: 'subscription', title: 'Suscripción' },
  ]);
  readonly dataHistorialFunds = signal<HistoryFund[]>([]);
  historyFundService = inject(HistoryFundService);

  constructor() {
    this.getListHistorial();
  }

  /***
   * Historial de fondos
   **/
  getListHistorial(): void {
    this.historyFundService.getHistoryFund().subscribe({
      next: (res) => {
        console.log('res historial', res);
        this.dataHistorialFunds.set(res ?? []);

      }, error: (error) => {
        console.error('Error history', error);
        this.dataHistorialFunds.set([]);
      }
    });
  }

}

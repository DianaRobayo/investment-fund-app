import { Component, inject, signal } from '@angular/core';
import { TableGeneral } from "../../shared/components/table-general/table-general";
import { HistoryFundService } from '../../core/services/history-fund-service';
import { HistoryFund } from '../../shared/models/historyFund';
import { Navbar } from "../../layout/navbar/navbar";
import Swal from 'sweetalert2';
import { Footer } from "../../layout/footer/footer";

@Component({
  selector: 'app-historial-funds',
  imports: [TableGeneral, Navbar, Footer],
  templateUrl: './historial-funds.html',
  styleUrl: './historial-funds.sass',
})
export class HistorialFunds {

  readonly columns = signal([
    { field: 'nameFund', title: 'Nombre del fondo' },
    { field: 'amountFund', title: 'Total de suscripción', isCurrency: true },
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
        this.dataHistorialFunds.set(res ?? []);

      }, error: (error) => {
        Swal.fire({
          title: 'Error',
          text: `No se pudo cargar el historial de fondos por ${error}`,
          icon: 'error'
        });
        this.dataHistorialFunds.set([]);
      }
    });
  }

}

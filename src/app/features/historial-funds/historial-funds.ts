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
    { field: 'quantityFund', title: 'Cantidad de suscripción' },
    { field: 'totalAmount', title: 'Total de suscripción', isCurrency: true },
    { field: 'date', title: 'Fecha' },
    { field: 'action', title: 'Acción' },
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
        res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.dataHistorialFunds.set((res) ?? []);

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

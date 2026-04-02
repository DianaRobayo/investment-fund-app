import { Component, signal } from '@angular/core';
import { Header } from "../../layout/header/header";
import { TableGeneral } from '../../shared/components/table-general/table-general';
import { Fund } from '../../shared/models/fund';
import { UnionRelationUserFund } from '../../shared/models/relationUserFund';

@Component({
  selector: 'app-dashboard',
  imports: [Header, TableGeneral],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.sass',
})
export class Dashboard {

  readonly columns = signal([
    { field: 'idFund', title: 'ID' },
    { field: 'nameFund', title: 'Nombre' },
    { field: 'category', title: 'Categoría' },
    { field: 'unitsFund', title: 'Unidades' },
    { field: 'minAmount', title: 'Valor apertura' },
    { field: 'amountFund', title: 'Total de suscripción' },
    { field: 'action', title: ' ', icon: 'delete' }
  ]);

  readonly listFunds = signal<UnionRelationUserFund[]>([]);

  onRowSelected(row: UnionRelationUserFund){
    console.log('row', row)

  }
}

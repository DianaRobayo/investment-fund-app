import { Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Header } from '../../layout/header/header';
import { TableGeneral } from '../../shared/components/table-general/table-general';
import { ListFunds } from '../../shared/models/listFunds';
import { ListFundService } from '../../core/services/list-fund-service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalFund } from '../../shared/components/modal-fund/modal-fund';
import { FundDataService } from '../../core/services/fund-data-service';
import { Buttons } from "../../shared/components/buttons/buttons";
import { RelationUserFund, UnionRelationUserFund } from '../../shared/models/relationUserFund';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [
    Header,
    TableGeneral,
    Buttons,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.sass',
})
export class Dashboard implements OnInit {
  @ViewChild('header') header: Header | undefined;

  readonly columns = signal([
    { field: 'idFund', title: 'ID' },
    { field: 'nameFund', title: 'Nombre del fondo' },
    { field: 'category', title: 'Categoría' },
    { field: 'minAmount', title: 'Valor de apertura' },
    // { field: 'update', title: 'Editar', icon: 'edit', colorButton: 'blue' },
    { field: 'delete', title: 'Eliminar', icon: 'delete', colorButton: 'red' },
  ]);

  readonly relationUserFund = signal<RelationUserFund[]>([]);
  readonly listFunds = signal<ListFunds[]>([]);
  readonly unionRelationUserFund = signal<UnionRelationUserFund[]>([]);
  readonly associatedListFunds = signal<ListFunds[]>([]);
  readonly excludedListFunds = signal<ListFunds[]>([]);
  readonly idUser = signal<string>('FZn3eAOPqyU'); // ID de usuario fijo para pruebas
  readonly temporaryAmount = signal<number>(0); // Valor temporal de monto utilizado

  readonly dialog = inject(MatDialog);
  readonly fundDataService = inject(FundDataService);
  private listFundsService = inject(ListFundService);

  constructor() {
    effect(() => {
      this.temporaryAmount.set(this.fundDataService.available());
    });
  }

  ngOnInit() {
    this.getDataUserFunds();
    // this.verifyCurrentAmount();
    this.fundDataService.updateAvailable();
  }

  /***
   * Metodo que valida si el usuario tiene algun fondo de inversión
   **/
  getDataUserFunds() {
    this.fundDataService.getFundByIdUser(this.idUser()).subscribe({
      next: (res) => {
        if (res) {
          this.relationUserFund.set(res);
          const arrayIdFunds = res.map((item: any) => item.idFund);
          this.getListFunds(arrayIdFunds);
        }
      }, error: (error) => {
        Swal.fire({
          title: 'Error',
          text: `Se presento error ${error} al cargar los fondos de
            inversión asociados al usuario.`,
          icon: 'error'
        })
      }
    });
  }

  /***
   * Lista de fondos de inversión
   **/
  getListFunds(arrayIdFunds: number[]): void {
    this.listFundsService.getListFunds().subscribe({
      next: (res) => {
        this.listFunds.set(res);
        const filterAssociatedListFunds = res.filter((fund) => arrayIdFunds.includes(fund.idFund)) ?? [];
        const filterExcludedListFunds = res.filter((fund) => !arrayIdFunds.includes(fund.idFund)) ?? [];
        this.associatedListFunds.set(filterAssociatedListFunds);
        this.excludedListFunds.set(filterExcludedListFunds);

        this.createDataUnion(this.listFunds(), this.relationUserFund());

      }, error: (error) => {
        this.excludedListFunds.set([]);
        this.associatedListFunds.set([]);
        Swal.fire({
          title: 'Error',
          text: `Se presento error ${error} al cargar el listado de fondos.`,
          icon: 'error'
        });
      }
    });
  }

  createDataUnion(listFunds: ListFunds[], relationUserFund: RelationUserFund[]): void {
    this.unionRelationUserFund.set(relationUserFund.map((obj) => {
      const findListFund = listFunds.find((fund) => Number(fund.idFund) === Number(obj.idFund));
      return {
        ...obj,
        nameFund: findListFund?.nameFund ?? '',
        category: findListFund?.category ?? '',
        minAmount: findListFund?.minAmount ?? 0,
      }
    }));

    this.fundDataService.getTotalInvested(this.unionRelationUserFund());
  }


  /**
   * Método que detecta la fila seleccionada para editar o eliminar la suscripcion
   * de un fondo
   * @param row fila seleccionada
   **/
  onRowSelected(row: any): void {
    if (row.column === 'delete') {
      this.modalDelete(row.element.id, row.element);
    } else if (row.column === 'update') {
      // this.modalUpdate(row.element);
    }
  }

  // modalUpdate(row: UnionRelationUserFund): void {
  //   const dialogRef = this.dialog.open(ModalFund, {
  //     data: {
  //       type: 'edit',
  //       row,
  //       currentAmount: this.temporaryAmount()
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //     if (result !== undefined) {
  //       this.getDataUserFunds();
  //       this.calculateCurrentAmount();
  //     }
  //   });
  // }

  modalDelete(id: string, row: UnionRelationUserFund): void {
    const dialogRef = this.dialog.open(ModalFund, {
      data: {
        type: 'delete',
        id,
        row,
        currentAmount: this.temporaryAmount()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getDataUserFunds();
        this.fundDataService.updateAvailable();
      }
    });
  }

  /***
   * Método que suscribe a un fondo de inversion
   **/
  addFunds() {
    const dialogRef = this.dialog.open(ModalFund, {
      data: {
        type: 'add',
        row: {
          nameFund: 'Agregar fondo',
          idUser: this.idUser()
        },
        listFunds: this.excludedListFunds(),
        currentAmount: this.temporaryAmount()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getDataUserFunds();
        this.fundDataService.updateAvailable();
      }
    });
  }
}

import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Header } from '../../layout/header/header';
import { TableGeneral } from '../../shared/components/table-general/table-general';
import { ListFunds } from '../../shared/models/listFunds';
import { ListFundService } from '../../core/services/list-fund-service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalFund } from '../../shared/components/modal-fund/modal-fund';
import { FundDataService } from '../../core/services/fund-data-service';
import { Buttons } from "../../shared/components/buttons/buttons";
import { RelationUserFund, UnionRelationUserFund } from '../../shared/models/relationUserFund';
import { title } from 'process';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-investment-funds',
  imports: [
    Header,
    TableGeneral,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    Buttons
  ],
  templateUrl: './investment-funds.html',
  styleUrl: './investment-funds.sass',
})
export class InvestmentFunds implements OnInit {
  @ViewChild('header') header: Header | undefined;

  readonly columns = signal([
    { field: 'idFund', title: 'ID' },
    { field: 'nameFund', title: 'Nombre' },
    { field: 'category', title: 'Categoría' },
    { field: 'minAmount', title: 'Monto Mínimo' },
    { field: 'action', title: ' ', icon: 'edit' }
  ]);

  readonly relationUserFund = signal<RelationUserFund[]>([]);
  readonly unionRelationUserFund = signal<UnionRelationUserFund[]>([]);
  readonly associatedListFunds = signal<ListFunds[]>([]);
  readonly excludedListFunds = signal<ListFunds[]>([]);
  readonly idUser = signal<string>('FZn3eAOPqyU');
  readonly temporaryAmount = signal<number>(0); // Valor temporal de monto utilizado
  readonly dialog = inject(MatDialog);
  fundDataService = inject(FundDataService);
  private listFundsService = inject(ListFundService);

  ngOnInit() {
    this.getDataUserFunds();
    this.prueba();
  }

  /***
   * Metodo que valida si el usuario tiene algun fondo de inversión
   **/
  getDataUserFunds() {
    this.fundDataService.getFundByIdUser(this.idUser()).subscribe({
      next: (res) => {
        if (res) {
          console.log('res fund user', res)
          this.relationUserFund.set(res);
          const arrayIdFunds = res.map((item: any) => item.idFund);
          this.getListFunds(arrayIdFunds);
        }
      }, error: (error) => {
        console.error('Error data user', error);
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
        const filterAssociatedListFunds = res.filter((fund) => arrayIdFunds.includes(fund.idFund)) ?? [];
        const filterExcludedListFunds = res.filter((fund) => !arrayIdFunds.includes(fund.idFund)) ?? [];
        this.associatedListFunds.set(filterAssociatedListFunds);
        this.excludedListFunds.set(filterExcludedListFunds);

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

  verifyCurrentAmount() {
    const totalInvested = this.header?.totalInvested() ?? 0;
    const currentAmount = this.header?.currentAmount() ?? 0;

    this.temporaryAmount.set(
      totalInvested === 0 ? currentAmount : totalInvested
    );
  }

  /**
   * Método que permite editar la suscripcion de un fondo
   * @param row fila seleccionada
   **/
  onRowSelected(row: ListFunds): void {
    this.verifyCurrentAmount();

    const merged: UnionRelationUserFund[] = this.relationUserFund()
      .filter((rel) => Number(rel.idFund) === Number(row.idFund))
      .map((rel) => ({
        ...row,
        ...rel,
      }));

    this.unionRelationUserFund.set(merged);

    const dialogRef = this.dialog.open(ModalFund, {
      height: '400px',
      width: '600px',
      data: {
        type: 'edit',
        row: this.unionRelationUserFund()[0],
        currentAmount: this.temporaryAmount()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (typeof result !== 'undefined') {
        this.getDataUserFunds();
        this.prueba();
        this.calculateCurrentAmount(result.total);
      }
    });
  }

  addFunds() {
    this.verifyCurrentAmount();

    const dialogRef = this.dialog.open(ModalFund, {
      height: '400px',
      width: '600px',
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
      console.log('The dialog was closed', result);
      if (typeof result !== 'undefined') {
        this.getDataUserFunds();
        this.prueba();
        this.calculateCurrentAmount(result.total);
      }
    });
  }

  calculateCurrentAmount(total: number): void {
    const currentAmount = this.temporaryAmount() ?? 0;
    const calculateTotal = currentAmount - total;
    this.fundDataService.updateFundData(calculateTotal);
  }

  prueba() {
    // const merged: UnionRelationUserFund[] = this.associatedListFunds().map((row) => {
    //   return this.relationUserFund()
    //     .filter((rel) => Number(rel.idFund) === Number(row.idFund))
    //     .map((rel) => ({
    //       ...row,
    //       ...rel,
    //     }));
    // });

    // const totalmerged = merged.reduce((acc, item) => {
    //   return acc + Number(item.minAmount) * Number(item.unitsFund);
    // }, 0);

    // console.log('merger', merged);
    // console.log('totalmerged', totalmerged);


    // const merged = [...this.relationUserFund(), ...this.associatedListFunds()].reduce((acc, curr) => {
    //   console.log('curr', curr, 'acc', acc);
      // const existing = acc.find(item => item.idFund === curr.idFund);
      // if (existing) {
      //   Object.assign(existing, curr); // Si ya existe, combina
      // } else {
      //   acc.push(curr); // Si no, añade el nuevo objeto
      // }
      // return acc;
    // }, []);

    // console.log(merged);
    console.log(' this.associatedListFunds()', this.associatedListFunds());
    console.log(' this.relationUserFund()', this.relationUserFund());
  }

}

import { Component, effect, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Buttons } from "../buttons/buttons";
import Swal from 'sweetalert2';
import { ListFunds } from '../../models/listFunds';
import { RelationUserFund, UnionRelationUserFund } from '../../models/relationUserFund';
import { FundDataService } from '../../../core/services/fund-data-service';
import { HistoryFundService } from '../../../core/services/history-fund-service';
import { HistoryFund } from '../../models/historyFund';

export interface DialogData {
  id?: string;
  row: UnionRelationUserFund;
  currentAmount: number;
  listFunds: ListFunds[];
  type: string;
}

@Component({
  selector: 'app-modal-fund',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    Buttons
  ],
  templateUrl: './modal-fund.html',
  styleUrl: './modal-fund.sass',
})
export class ModalFund {

  readonly dialogRef = inject(MatDialogRef<ModalFund>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  fundsService = inject(FundDataService);
  fundDataService = inject(FundDataService);
  historyFundService = inject(HistoryFundService);
  listFunds = signal<ListFunds[]>(this.data.listFunds ?? []);
  buttonName = signal(this.getButtonName());
  readonly dataRelationUserFund = signal<RelationUserFund[]>([]);
  fundsForm = new FormGroup({
    idFund: new FormControl<number | null>(null),
    nameFund: new FormControl<string | null>(null),
    // unitsFund: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    minAmount: new FormControl<number>(0),
    // total: new FormControl<number>(0),
  });

  constructor() {
    this.dialogRef.disableClose = true;
    this.dialogRef.updateSize('600px', '400px');
    this.setDataForm();
    this.changeFund();

    effect(() => {
      this.dataRelationUserFund.set(this.fundDataService.dataUserFund());
    });

  }

  private getButtonName(): string {
    if (this.data.type === 'edit') return 'Actualizar';
    if (this.data.type === 'delete') return 'Eliminar';
    return 'Comprar';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setDataForm(): void {
    console.log('this.data.row', this.data)
    if (this.data.type === 'add') {
      this.fundsForm.controls.idFund.addValidators(Validators.required);
    } else {
      this.fundsForm.patchValue(this.data.row);
      this.fundDataService.getDataUserByFund('FZn3eAOPqyU', Number(this.data.row.idFund));
    }

    this.fundsForm.markAsUntouched();
    this.fundsForm.markAsPristine();
  }

  /***
   * Metodo que detecta los cambios en el listado de fondos para capturar el
   * valor unitario de ese fondo
  **/
  changeFund() {
    if (this.data.type === 'add') {
      this.fundsForm.controls.idFund.valueChanges
        .subscribe((res) => {
          if (res) {
            const fund = this.listFunds().find((fund: ListFunds) => fund.idFund === Number(res));
            this.fundsForm.controls.minAmount.setValue(fund?.minAmount ?? 0);
            this.fundsForm.controls.nameFund.setValue(fund?.nameFund ?? '');
            // Carga la relación usuario-fondo al seleccionar un fondo
            this.fundDataService.getDataUserByFund('FZn3eAOPqyU', Number(res));
          }
        });
    }
  }

  /***
   * Metodo que calcula el valor total dependiendo de las unidades agregadas
  **/
  calculateTotal() {
    // this.fundsForm.controls.unitsFund.valueChanges
    //   .pipe(
    //     startWith(this.fundsForm.value.unitsFund ?? 0),
    //     takeUntilDestroyed()
    //   ).subscribe((res) => {
    //     if (res) {
    //       const total = Number(res) * Number(this.fundsForm.value.minAmount);
    //       this.fundsForm.controls.total.setValue(total);
    //     }
    //   });
  }

  /***
   * Metodo que valida si el usuario tiene fondos suficientes para adquirir
   * el fondo seleccionado.
   **/
  buyFund() {
    if (this.fundsForm.valid) {
      const total = this.fundsForm.value.minAmount ?? 0;

      // Compara el total con el monto actual del usuario
      if (total > this.data.currentAmount && this.data.type !== 'delete') {
        Swal.fire({
          icon: 'error',
          title: 'Fondos insuficientes',
          text: `El total de suscripción es $${total.toLocaleString('es-ES')}
            y supera su monto actual $${this.data.currentAmount.toLocaleString('es-ES')}.`,
        });
        return;
      }

      if (this.data.type === 'delete') {
        this.saveData();

        this.dialogRef.close({
          idFund: this.data.row.id,
          // units: this.fundsForm.value.unitsFund,
          total
        });
      }

      // Si detecta cambios almacena información y cierra el modal
      if (this.fundsForm.dirty) {
        Swal.fire({
          icon: 'success',
          title: 'Suscripción exitosa',
          text: `Se ha suscrito al fondo ${this.fundsForm.value.nameFund}
            por un valor de $${total.toLocaleString('es-ES')}.`,
        });

        this.saveData();

        this.dialogRef.close({
          idFund: this.fundsForm.value.idFund ?? this.data.row.idFund,
          // units: this.fundsForm.value.unitsFund,
          total
        });
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos requeridos.'
      });
    }
  }

  saveData() {
    const idUser = this.data.row.idUser;
    const idFund = Number(this.fundsForm.value.idFund);
    // const unitsFund = Number(this.fundsForm.value.unitsFund);
    // const totalFund = Number(this.fundsForm.value.total);

/*     if (this.data.type === 'edit') {
      this.updateData(idUser, idFund, unitsFund, totalFund);
    } else  */
    if (this.data.type === 'delete') {
      this.modalDelete(String(this.data.id));
    } else {
      this.modalCreate(idUser, idFund);
    }

    this.addRegisterHistory();
  }

  updateData(idUser: string, idFund: number, unitsFund: number, totalFund: number) {
    const rowId = this.data.row.id;
    if (!rowId) return;

    const body: RelationUserFund = {
      id: rowId,
      idUser,
      idFund
    };

    this.fundsService.updateDataUserFunds(rowId, body).subscribe({
      next: () => {
      }, error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: `Se presentó un error ${error} al actualizar tu suscripción.`,
        });
      }
    });
  }

  modalDelete(id: string): void {
    this.fundsService.deleteDataUserFund(id).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Fondo eliminado',
          text: `Has eliminado el fondo de tu portafolio.`,
          icon: 'success'
        });
      }, error: (error) => {
        Swal.fire({
          title: 'Error',
          text: `Se presentó un error ${error} al eliminar el fondo.`,
          icon: 'error'
        });
      }
    });
  }

  modalCreate(idUser: string, idFund: number): void {
    const body: RelationUserFund = {
      idUser,
      idFund
    };

    this.fundsService.addDataUserFunds(body).subscribe({
      next: () => {
      }, error: (error) => {
        Swal.fire({
          title: 'Error',
          text: `Se presentó un error ${error} al agregar el fondo.`,
          icon: 'error'
        });
      }
    });
  }

  addRegisterHistory() {
    const subscriptionType = this.data.type === 'delete' ? 'Cancelación' : 'Suscripción';
    const bodyHistory: HistoryFund = {
      idUser: this.data.row.idUser,
      idFund: Number(this.fundsForm.value.idFund),
      nameFund: String(this.fundsForm.value.nameFund),
      amountFund: Number(this.fundsForm.value.minAmount),
      date: new Date(),
      subscription: subscriptionType
    };

    this.historyFundService.addHistoryFund(bodyHistory).subscribe({
      next: (res) => {
        console.log('update successfully', res);
      }, error: (error) => {
        console.error('Error updating fund', error);
      }
    });
  }
}

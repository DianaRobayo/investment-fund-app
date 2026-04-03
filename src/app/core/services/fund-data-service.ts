import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RelationUserFund, UnionRelationUserFund } from '../../shared/models/relationUserFund';
import { Observable } from 'rxjs';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class FundDataService {
  private apiUrl = 'http://localhost:3000/userFunds';

  // Información actual de suscripciones
  private currentFundValueSignal = signal<number>(0);
  private availableFundValueSignal = signal<number>(0);
  private dataUserFundSignal = signal<RelationUserFund[]>([]);
  currentValue = this.currentFundValueSignal.asReadonly(); //Total invertido
  available = this.availableFundValueSignal.asReadonly(); //Total disponible
  dataUserFund = this.dataUserFundSignal.asReadonly(); //Data de usuario por fondo

  userService = inject(UserService);

  constructor(private http: HttpClient) { }

  getTotalInvested(dataRelation: UnionRelationUserFund[]) {
    const total = dataRelation.reduce((acc, item) => acc + (item.minAmount ?? 0), 0);
    this.currentFundValueSignal.set(total);
    const idUser = dataRelation[0]?.idUser ?? 'FZn3eAOPqyU';
    this.updateAvailable(idUser);
  }

  /* Metodo que calcula valor total disponible - total invertido segun el usuario*/
  updateAvailable(idUser: string = 'FZn3eAOPqyU'): void {
    this.userService.getUserById(idUser).subscribe({
      next: (res) => {
        if (res) {
          const currentAmount = res[0]?.currentAmount ?? 0;
          this.availableFundValueSignal.set(currentAmount - this.currentValue());
        }
      }, error: (error) => {
        console.error('Error data user', error);
      }
    });
  }

  // /* Actualiza el valor actual de las suscripciones segun el usuario */
  // getTotalInvested(idUser: string = 'FZn3eAOPqyU'): void {
  //   this.getFundByIdUser(idUser).subscribe({
  //     next: (res) => {
  //       if (res) {
  //         console.log('xxx', res)
  //         // const total = res.reduce((acc, item) => acc + (item.totalFund ?? 0), 0);
  //         // console.log('total', total);
  //         // this.currentFundValueSignal.set(total);
  //         // this.updateAvailable(idUser);
  //       }
  //     }, error: (error) => {
  //       console.error('Error data user', error);
  //     }
  //   });
  // }

  /* Obtiene la relación de fondos por usuario */
  getDataUserByFund(idUser: string, idFund: number): void {
    this.getRelationFundByIdUser(idUser, idFund).subscribe({
      next: (res) => {
        if (res) {
          this.dataUserFundSignal.set(res);
        }
      }, error: (error) => {
        console.error('Error data user', error);
      }
    });
  }

  //CRUD fondos por usuario
  getFundByIdUser(idUser: string): Observable<RelationUserFund[]> {
    return this.http.get<RelationUserFund[]>(`${this.apiUrl}?idUser=${idUser}`);
  }

  getRelationFundByIdUser(idUser: string, idFund: number): Observable<RelationUserFund[]> {
    return this.http.get<RelationUserFund[]>(`${this.apiUrl}?idUser=${idUser}&idFund=${idFund}`);
  }

  addDataUserFunds(data: RelationUserFund): Observable<RelationUserFund> {
    return this.http.post<RelationUserFund>(this.apiUrl, data);
  }

  updateDataUserFunds(id: string, body: RelationUserFund): Observable<RelationUserFund> {
    return this.http.put<RelationUserFund>(`${this.apiUrl}/${id}`, body);
  }

  deleteDataUserFund(id: string): Observable<RelationUserFund> {
    return this.http.delete<RelationUserFund>(`${this.apiUrl}/${id}`);
  }
}

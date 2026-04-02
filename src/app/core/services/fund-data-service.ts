import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { RelationUserFund } from '../../shared/models/relationUserFund';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FundDataService {
  private apiUrl = 'http://localhost:3000/userFunds';

  // Información actual de suscripciones
  private currentFundValueSignal = signal<number>(0);
  currentValue = this.currentFundValueSignal.asReadonly();

  constructor(private http: HttpClient) { }

  /* Actualiza el valor actual de las suscripciones */
  updateFundData(newCurrentValue: number) {
    this.currentFundValueSignal.set(newCurrentValue);
  }

  //CRUD fondos por usuario
  // getUserFunds(): Observable<RelationUserFund[]> {
  //   return this.http.get<RelationUserFund[]>(`${this.apiUrl}`);
  // }

  getFundByIdUser(idUser: string): Observable<RelationUserFund[]> {
    return this.http.get<RelationUserFund[]>(`${this.apiUrl}?idUser=${idUser}`);
  }

  addDataUserFunds(data: RelationUserFund): Observable<RelationUserFund> {
    return this.http.post<RelationUserFund>(this.apiUrl, data);
  }

  updateDataUserFunds(id: string, body: RelationUserFund): Observable<RelationUserFund> {
    return this.http.put<RelationUserFund>(`${this.apiUrl}/${id}`, body);
  }

  // deleteDataUserFund(id: string): Observable<RelationUserFund> {
  //   return this.http.delete<RelationUserFund>(`${this.apiUrl}/${id}`);
  // }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fund } from '../../shared/models/fund';

@Injectable({
  providedIn: 'root',
})
export class FundsService {
  private apiUrl = 'http://localhost:3000/fondos';

  constructor(private http: HttpClient) { }

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }

  addFund(fund: Fund): Observable<Fund> {
    return this.http.post<Fund>(this.apiUrl, fund);
  }

  updateFund(id: string, fund: Fund): Observable<Fund> {
    return this.http.put<Fund>(`${this.apiUrl}/${id}`, fund);
  }

  deleteFund(id: string): Observable<Fund> {
    return this.http.delete<Fund>(`${this.apiUrl}/${id}`);
  }

}

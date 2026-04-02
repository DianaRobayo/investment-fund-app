import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoryFund } from '../../shared/models/historyFund';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryFundService {
  private apiUrl = 'http://localhost:3000/historyFunds';

  constructor(private http: HttpClient) { }

  getHistoryFund(): Observable<HistoryFund[]> {
    return this.http.get<HistoryFund[]>(this.apiUrl);
  }

  addHistoryFund(data: HistoryFund): Observable<HistoryFund> {
    return this.http.post<HistoryFund>(this.apiUrl, data);
  }

}

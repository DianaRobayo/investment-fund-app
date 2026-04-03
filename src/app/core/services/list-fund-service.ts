import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListFunds } from '../../shared/models/listFunds';

@Injectable({
  providedIn: 'root',
})
export class ListFundService {
  private apiListFunds = 'http://localhost:3000/listFunds';

  constructor(private http: HttpClient) { }

  getListFunds(): Observable<ListFunds[]> {
    return this.http.get<ListFunds[]>(this.apiListFunds);
  }

  getFundById(id: number | string): Observable<ListFunds[]> {
    return this.http.get<ListFunds[]>(`${this.apiListFunds}?id=${id}`);
  }
}

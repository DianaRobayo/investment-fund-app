import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../../shared/models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUser(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}?id=${id}`);
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);
  }

  updateUser(id: string, user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<Users> {
    return this.http.delete<Users>(`${this.apiUrl}/${id}`);
  }
}

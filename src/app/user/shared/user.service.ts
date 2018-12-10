import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SERVER_URL = 'http://10.0.1.148:8080/computer-database/api/user';

  constructor(private _httpClient: HttpClient) { }

  getAllCompanies(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.SERVER_URL}/all`);
  }

  getCompanyById(id: number): Observable<User> {
    return this._httpClient.get<User>(`${this.SERVER_URL}/${id}`);
  }

  addCompany(company: User): Observable<User> {
    return this._httpClient.post<User>(this.SERVER_URL, company);
  }

  deleteCompanyById(id: number): Observable<User> {
    return this._httpClient.delete<User>(`${this.SERVER_URL}/${id}`);
  }

  updateCompany(company: User): Observable<User> {
    return this._httpClient.put<User>(this.SERVER_URL, company);
  }
}

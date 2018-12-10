import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Company } from 'src/app/shared/model/company.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class CompanyService {

  private SERVER_URL = 'http://10.0.1.148:8080/computer-database/api/company';
  private SERVER_URL_IP = 'http://localhost:8080/computer-database/api/company';
  constructor(private _httpClient: HttpClient) {
   }

  getAllCompanies(): Observable<Company[]> {
    return this._httpClient.get<Company[]>(`${this.SERVER_URL}/all`);
  }

  getCompanyById(id: number): Observable<Company> {
    return this._httpClient.get<Company>(`${this.SERVER_URL}/${id}`);
  }

  addCompany(company: Company): Observable<Company> {
    return this._httpClient.post<Company>(this.SERVER_URL, company);
  }

  deleteCompanyById(id: number): Observable<Company> {
    return this._httpClient.delete<Company>(`${this.SERVER_URL}/${id}`);
  }

  updateCompany(company: Company): Observable<Company> {
    return this._httpClient.put<Company>(this.SERVER_URL, company);
  }

}

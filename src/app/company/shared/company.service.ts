import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Company } from 'src/app/shared/model/company.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderHttpService } from 'src/app/shared/service/header-http.service';

@Injectable({
  providedIn: 'root'
})


export class CompanyService {

  private SERVER_URL = 'http://10.0.1.148:8080/computer-database/api/company';
  private SERVER_URL_IP = 'http://localhost:8080/computer-database/api/company';
  constructor(private _httpClient: HttpClient, private _headerHttpService: HeaderHttpService) {}

  getAllCompanies(): Observable<Company[]> {
    console.log(this._headerHttpService.getHeader());
    return this._httpClient.get<Company[]>(`${this.SERVER_URL}/all`, {headers: this._headerHttpService.getHeader()});
  }

  getCompanyById(id: number): Observable<Company> {
    console.log(this._headerHttpService.getHeader());
    return this._httpClient.get<Company>(`${this.SERVER_URL}/${id}`, {headers: this._headerHttpService.getHeader()});
  }

  addCompany(company: Company): Observable<Company> {
    console.log(this._headerHttpService.getHeader());
    return this._httpClient.post<Company>(this.SERVER_URL, company, {headers: this._headerHttpService.getHeader()});
  }

  deleteCompanies(tabId: string[]): Observable<Company> {
    console.log(this._headerHttpService.getHeader());
    return this._httpClient.delete<Company>(`${this.SERVER_URL}?idTab=${tabId}`, {headers: this._headerHttpService.getHeader()});
  }

  updateCompany(company: Company): Observable<Company> {
    console.log(this._headerHttpService.getHeader());
    return this._httpClient.put<Company>(this.SERVER_URL, company, {headers: this._headerHttpService.getHeader()});
  }

}

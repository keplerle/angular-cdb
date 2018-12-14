import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Computer } from 'src/app/shared/model/computer.model';
import { HeaderHttpService } from '../../shared/service/header-http.service';
@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private SERVER_URL = 'http://10.0.1.148:8080/computer-database/api/computer';
  private SERVER_TEST_IP = 'http://localhost:8080/computer-database/api/computer';
  constructor(private _httpClient: HttpClient, private _headerHttpService: HeaderHttpService) {
   }

  getAllComputersByPage(pageNb: number, pageSize: number): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(`${this.SERVER_TEST_IP}/all?page=${pageNb}&size=${pageSize}`,
     {headers: this._headerHttpService.getHeader()} );
  }

  getAllComputersByNameByPage(name: string, pageNb: number, pageSize: number): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(`${this.SERVER_TEST_IP}/all/${name}?page=${pageNb}&size=${pageSize}`
    , {headers: this._headerHttpService.getHeader()});
  }

  getCountComputers(): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_TEST_IP}/count`, {headers: this._headerHttpService.getHeader()});
  }

  getCountComputersByName(name: string): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_TEST_IP}/count/${name}`, {headers: this._headerHttpService.getHeader()});
  }

  getComputerById(id: number): Observable<Computer> {
    return this._httpClient.get<Computer>(`${this.SERVER_TEST_IP}/${id}`, {headers: this._headerHttpService.getHeader()});
  }

  addComputer(company: Computer): Observable<Computer> {
    return this._httpClient.post<Computer>(this.SERVER_TEST_IP, company, {headers: this._headerHttpService.getHeader()});
  }

  deleteComputers(tabId: string[]): Observable<Computer> {
    return this._httpClient.delete<Computer>(`${this.SERVER_TEST_IP}?idTab=${tabId}`, {headers: this._headerHttpService.getHeader()});
  }

  updateComputer(company: Computer): Observable<Computer> {
    return this._httpClient.put<Computer>(this.SERVER_TEST_IP, company, {headers: this._headerHttpService.getHeader()});
  }

}

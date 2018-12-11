import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Computer } from 'src/app/shared/model/computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private SERVER_URL = 'http://10.0.1.148:8080/computer-database/api/computer';
  private SERVER_URL_IP = 'http://localhost/computer-database/api/computer';
  constructor(private _httpClient: HttpClient) { }

  getAllComputersByPage(pageNb: number, pageSize: number): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(`${this.SERVER_URL}/all?page=${pageNb}&size=${pageSize}`);
  }

  getAllComputersByNameByPage(name: string, pageNb: number, pageSize: number): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(`${this.SERVER_URL}/all/${name}?page=${pageNb}&size=${pageSize}`);
  }

  getCountComputers(): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_URL}/count`);
  }

  getCountComputersByName(name: string): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_URL}/count/${name}`);
  }

  getComputerById(id: number): Observable<Computer> {
    return this._httpClient.get<Computer>(`${this.SERVER_URL}/${id}`);
  }

  addComputer(company: Computer): Observable<Computer> {
    return this._httpClient.post<Computer>(this.SERVER_URL, company);
  }

  deleteComputers(tabId: string[]): Observable<Computer> {
    return this._httpClient.delete<Computer>(`${this.SERVER_URL}?idTab=${tabId}`);
  }

  updateComputer(company: Computer): Observable<Computer> {
    return this._httpClient.put<Computer>(this.SERVER_URL, company);
  }

}

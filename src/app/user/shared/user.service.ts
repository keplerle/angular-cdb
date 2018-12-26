import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HeaderHttpService } from 'src/app/shared/service/header-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SERVER_TEST_URL = 'http://10.0.1.168:8080/computer-database/api/user/connect';
  // private SERVER_TEST_URL = 'http://localhost:8080/computer-database/api/user/connect';
  private headers: HttpHeaders;
  constructor(private _httpClient: HttpClient, private _headerHttpService: HeaderHttpService) {

   }

  public connect(username: string, password: string): Observable<any> {
    this._headerHttpService.setHeader(username, password);
    return this._httpClient.get<any>(this.SERVER_TEST_URL, {headers: this._headerHttpService.getHeader()} );
  }

}

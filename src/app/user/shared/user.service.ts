import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SERVER_URL = 'http://10.0.1.148:8080/computer-database/api/user/connect';
  constructor(private _httpClient: HttpClient) { }
  getUser(id: number): Observable<User> {
    return null;
  }

  public connect(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa(username + ':' + password) });
    return this._httpClient.get<any>(this.SERVER_URL, {headers: headers} );
  }

}

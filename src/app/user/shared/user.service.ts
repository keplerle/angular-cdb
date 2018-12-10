import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SERVER_URL_IP = 'http://10.0.1.148:8080/computer-database/api/user';
  private SERVER_URL = 'http://localhost:8080/computer-database/api/user';
  constructor(private _httpClient: HttpClient) { }

  getUser(id: number): Observable<User> {
    return null;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HeaderHttpService {

  headers: HttpHeaders ;
  constructor() { }


getHeader(): HttpHeaders {
return this.headers;
}

setHeader(username: string, password: string) {
  this.headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(username + ':' + password),
 });
}

clearHeader() {
  this.headers = null;
}

}

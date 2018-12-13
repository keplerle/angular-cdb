import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HeaderHttpService } from '../../../shared/service/header-http.service';
import { User } from 'src/app/shared/model/user.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-connexion',
  templateUrl: './user-connexion.component.html',
  styleUrls: ['./user-connexion.component.scss']
})
export class UserConnexionComponent implements OnInit {

  public userInfo = new User();

  constructor(
    private _userService: UserService,
     private _headerHttpService: HeaderHttpService,
      private _router: Router,
       public snackBar: MatSnackBar) { }


  ngOnInit() {
    if (localStorage.getItem('tokenCDB') != null) {
      this._headerHttpService.setHeaderByToken(localStorage.getItem('tokenCDB'));
      this._router.navigate(['/computer']);
    }
  }

  public onSubmit() {
    this._userService.connect(this.userInfo.username, this.userInfo.saltedPassword )
    .subscribe(
      result => {
        localStorage.setItem('roleCDB', result.authorities[0].authority);
        this._router.navigate(['/computer']);
        this.openSnackBar('Successful login ! ', 'LOGIN');
      }
      ,
       error => {
         this._headerHttpService.clearHeader();
         this.openSnackBar('Coulnd\'t log-in', 'ERROR');
      });

  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}

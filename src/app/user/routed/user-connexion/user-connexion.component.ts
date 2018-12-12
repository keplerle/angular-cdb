import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HeaderHttpService } from '../../../shared/service/header-http.service';
import { User } from 'src/app/shared/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-connexion',
  templateUrl: './user-connexion.component.html',
  styleUrls: ['./user-connexion.component.scss']
})
export class UserConnexionComponent implements OnInit {

  public userInfo = new User();

  constructor(private _userService: UserService, private _headerHttpService: HeaderHttpService, private _router: Router) { }

  ngOnInit() {
    if (this._headerHttpService.getHeader() != null) {
      this._router.navigate(['/computer']);
    }
  }

  public onSubmit() {
    this._userService.connect(this.userInfo.username, this.userInfo.saltedPassword )
    .subscribe(
      result => {
        this._router.navigate(['/computer']);
        console.log('successful login : ' + result);
      }
      ,
       error => {
         this._headerHttpService.clearHeader();

         console.log('login error ');
      });
  }

}

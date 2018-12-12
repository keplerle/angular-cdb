import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from 'src/app/shared/model/user.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-connexion',
  templateUrl: './user-connexion.component.html',
  styleUrls: ['./user-connexion.component.scss']
})
export class UserConnexionComponent implements OnInit {

  public userInfo = new User();

  constructor(private _userService: UserService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public onSubmit() {
    this._userService.connect(this.userInfo.username, this.userInfo.saltedPassword )
    .subscribe(
      result => this.openSnackBar('Successful login : ' + result, 'LOGIN'),
       error => this.openSnackBar('Coulnd\'t log-in', 'ERROR'));
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}

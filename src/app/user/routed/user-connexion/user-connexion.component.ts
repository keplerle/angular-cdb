import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-user-connexion',
  templateUrl: './user-connexion.component.html',
  styleUrls: ['./user-connexion.component.scss']
})
export class UserConnexionComponent implements OnInit {

  public userInfo = new User();

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  public onSubmit() {
    this._userService.connect(this.userInfo.username, this.userInfo.saltedPassword )
    .subscribe(
      result => console.log('successful login : ' + result),
       error => console.log('login error '));
  }

}

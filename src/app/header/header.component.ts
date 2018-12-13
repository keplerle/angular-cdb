import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderHttpService } from '../shared/service/header-http.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router,  private _headerHttpService: HeaderHttpService, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'logout',
        sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-exit_to_app-24px.svg'));
     }

  ngOnInit() {
  }

  disableButton(): boolean {
    return this._router.url.includes('/login');
  }

  logout() {
    this._headerHttpService.clearHeader();
    this._router.navigate(['/login']);
  }
}

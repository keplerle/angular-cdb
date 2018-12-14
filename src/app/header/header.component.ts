import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderHttpService } from '../shared/service/header-http.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMobile = false;
  constructor(private _router: Router,  private _headerHttpService: HeaderHttpService, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, private deviceService: DeviceDetectorService ) {
      iconRegistry.addSvgIcon(
        'logout',
        sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-exit_to_app-24px.svg'));
        iconRegistry.addSvgIcon(
          'computer',
          sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-computer-24px.svg'));
          iconRegistry.addSvgIcon(
            'company',
            sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-domain-48px.svg'));
     }

  ngOnInit() {
    if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
      this.isMobile = true;
    }
  }

  disableButton(): boolean {
    return this._router.url.includes('/login');
  }

  logout() {
    this._headerHttpService.clearHeader();
    this._router.navigate(['/login']);
  }
}

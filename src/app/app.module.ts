import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComputerListComponent } from './computer/routed/computer-list/computer-list.component';
import { ComputerEditComponent } from './computer/routed/computer-edit/computer-edit.component';
import { ComputerCreateComponent } from './computer/routed/computer-create/computer-create.component';
import { CompanyCreateComponent } from './company/routed/company-create/company-create.component';
import { CompanyListComponent } from './company/routed/company-list/company-list.component';
import { CompanyEditComponent } from './company/routed/company-edit/company-edit.component';
import { UserConnexionComponent } from './user/routed/user-connexion/user-connexion.component';

@NgModule({
  declarations: [
    AppComponent,
    ComputerListComponent,
    ComputerEditComponent,
    ComputerCreateComponent,
    CompanyCreateComponent,
    CompanyListComponent,
    CompanyEditComponent,
    UserConnexionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

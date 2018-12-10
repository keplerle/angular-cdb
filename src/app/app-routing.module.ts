import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerListComponent } from './computer/routed/computer-list/computer-list.component';
import { CompanyListComponent } from './company/routed/company-list/company-list.component';
import { UserConnexionComponent } from './user/routed/user-connexion/user-connexion.component';

const routes: Routes = [
  {
    path: 'computer',
    component: ComputerListComponent
  },
  {
    path: 'company',
    component: CompanyListComponent
  },
  {
    path: 'user',
    component: UserConnexionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

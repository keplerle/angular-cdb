import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyCreateComponent } from './routed/company-create/company-create.component';
import { CompanyListComponent } from './routed/company-list/company-list.component';
import { CompanyEditComponent } from './routed/company-edit/company-edit.component';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompanyCreateComponent,
    CompanyListComponent,
    CompanyEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CompanyCreateComponent,
    CompanyEditComponent
  ]
})
export class CompanyModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerCreateComponent } from './routed/computer-create/computer-create.component';
import { ComputerEditComponent } from './routed/computer-edit/computer-edit.component';
import { ComputerListComponent } from './routed/computer-list/computer-list.component';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [
    ComputerListComponent,
    ComputerEditComponent,
    ComputerCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  entryComponents: [
    ComputerCreateComponent,
    ComputerEditComponent
  ]
})
export class ComputerModule { }

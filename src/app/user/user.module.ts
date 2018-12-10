import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConnexionComponent } from './routed/user-connexion/user-connexion.component';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserConnexionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }

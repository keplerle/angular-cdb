import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Company } from 'src/app/shared/model/company.model';
export interface DialogData {
  company: Company;
}
@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  updatedCompany: Company = new Company();

  constructor(
    public dialogRef: MatDialogRef<CompanyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
       this.updatedCompany.name = data.company.name ;
       this.updatedCompany.id = data.company.id ;
    }


    ngOnInit() {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }



}

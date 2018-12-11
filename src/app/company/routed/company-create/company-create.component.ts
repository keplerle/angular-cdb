import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Company } from 'src/app/shared/model/company.model';


export interface DialogData {
  company: Company;
}
@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CompanyCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    ngOnInit() {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
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

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from 'src/app/company/routed/company-create/company-create.component';
import { Computer } from 'src/app/shared/model/computer.model';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from 'src/app/company/shared/company.service';

export interface DialogData {
  computer: Computer;
}

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss']
})
export class ComputerCreateComponent implements OnInit {
  companyList: Company[];
  constructor(
    public dialogRef: MatDialogRef<ComputerCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _companyService: CompanyService) {}
    ngOnInit() {
     this.getCompanies();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


  getCompanies() {
    this._companyService.getAllCompanies().subscribe(response => {
      this.companyList = response;
    });
  }
}

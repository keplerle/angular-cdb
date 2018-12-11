import { Component, OnInit, Inject } from '@angular/core';
import { Computer } from 'src/app/shared/model/computer.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { CompanyService } from 'src/app/company/shared/company.service';
import { Company } from 'src/app/shared/model/company.model';
export interface DialogData {
  computer: Computer;
}

@Component({
  selector: 'app-computer-edit',
  templateUrl: './computer-edit.component.html',
  styleUrls: ['./computer-edit.component.scss']
})
export class ComputerEditComponent implements OnInit {

  updatedComputer: Computer = new Computer();
  companies: Company[];
  constructor(
    public dialogRef: MatDialogRef<ComputerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    , private _companyService: CompanyService) {
       this.updatedComputer.name = data.computer.name ;
       this.updatedComputer.id = data.computer.id ;
       this.updatedComputer.discontinued = data.computer.discontinued ;
       this.updatedComputer.introduced = data.computer.introduced ;
       this.updatedComputer.companyId = data.computer.companyId ;
       this.updatedComputer.companyName = data.computer.companyName ;
    }

  ngOnInit() {
    this._companyService.getAllCompanies().subscribe(result => {this.companies = result; });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

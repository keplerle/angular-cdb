import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from '../../shared/company.service';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { MatDialog } from '@angular/material';
import { CompanyEditComponent } from '../company-edit/company-edit.component';

export interface PeriodicElement {
  name: string;
}
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  displayedColumns: string[];
  dataSource: Company[];

  company: Company = new Company();
  constructor(private _companyService: CompanyService, public dialog: MatDialog) {
    this.displayedColumns = ['name'];
   }

  ngOnInit() {
   this.getAllCompanies();
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(CompanyCreateComponent, {
      data: {company: this.company}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addCompany(result);
    });

  }
    updateDialog(companyToUpdate: Company): void {
      const dialogRef = this.dialog.open(CompanyEditComponent, {
        data: {company: companyToUpdate}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.updateCompany(result);
      });
  }

  getAllCompanies() {
  this._companyService.getAllCompanies().subscribe(response => {
    this.dataSource = response;
  });
}

  addCompany(newCompany: Company) {
  this._companyService.addCompany(newCompany).subscribe(response => {
    this.getAllCompanies();
  });
}

  updateCompany(updateCompany: Company) {
    this._companyService.updateCompany(updateCompany).subscribe(response => {
      this.getAllCompanies();
    });
}

}

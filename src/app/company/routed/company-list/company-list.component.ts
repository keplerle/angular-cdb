import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from '../../shared/company.service';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { MatDialog } from '@angular/material';
import { CompanyEditComponent } from '../company-edit/company-edit.component';
import {SelectionModel} from '@angular/cdk/collections';
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
  deleteFlag: boolean;
  selection = new SelectionModel<PeriodicElement>(true, []);

  company: Company = new Company();
  constructor(private _companyService: CompanyService, public dialog: MatDialog) {
    this.displayedColumns = ['name'];
    this.deleteFlag = false;

   }

  ngOnInit() {
   this.getAllCompanies();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
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

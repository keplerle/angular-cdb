import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from '../../shared/company.service';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { MatDialog } from '@angular/material';
import { CompanyEditComponent } from '../company-edit/company-edit.component';
import {SelectionModel} from '@angular/cdk/collections';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

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
  constructor(private _companyService: CompanyService, public dialog: MatDialog, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.displayedColumns = ['name','select'];
    this.deleteFlag = false;
    iconRegistry.addSvgIcon(
      'trash',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-delete-24px.svg'));
      iconRegistry.addSvgIcon(
        'add',
        sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-add_circle-24px.svg'));
     }
   
  
  ngOnInit() {
  // this.getAllCompanies();
  
  this.dataSource =[
    {id: 1, name: 'Hydrogen'},
    {id: 2, name: 'Helium'},
    {id: 3, name: 'Lithium'},
    {id: 4, name: 'Beryllium'},
    {id: 5, name: 'Boron'},
    {id: 6, name: 'Carbon'}
  ];
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

deleteCompanies(companiesId: number) {
  this._companyService.deleteCompanyById(companiesId).subscribe(response => {
    this.getAllCompanies();
  });
}

}

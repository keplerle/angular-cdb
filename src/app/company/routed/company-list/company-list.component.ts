import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from '../../shared/company.service';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { MatDialog } from '@angular/material';
import { CompanyEditComponent } from '../company-edit/company-edit.component';
import {SelectionModel} from '@angular/cdk/collections';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  displayedColumns: string[];
  dataSource: Company[];
  deleteFlag: boolean;
  selection = new SelectionModel<Company>(true, []);
  arrayIds: string[];
  company: Company = new Company();
  constructor( public snackBar: MatSnackBar,
     private _companyService: CompanyService,
      public dialog: MatDialog,
       iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer) {
    this.displayedColumns = ['name', 'select'];
    this.deleteFlag = false;
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-delete-24px.svg'));
      iconRegistry.addSvgIcon(
        'add',
        sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-add_circle-24px.svg'));
        iconRegistry.addSvgIcon(
          'edit',
          sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-edit-24px.svg'));
          iconRegistry.addSvgIcon(
            'delete-forever',
            sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-delete_forever-24px.svg'));
     }
  ngOnInit() {
   this.getAllCompanies();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

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
      if (result != null) {
        this.addCompany(result);
      }
    });

  }
    updateDialog(companyToUpdate: Company): void {
      const dialogRef = this.dialog.open(CompanyEditComponent, {
        data: {company: companyToUpdate}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.updateCompany(result);
        }
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
    this.openSnackBar('Successfully added companies !', 'ADD');
  });
}

  updateCompany(updateCompany: Company) {
    this._companyService.updateCompany(updateCompany).subscribe(response => {
      this.getAllCompanies();
      this.openSnackBar('Successfully updated companies !', 'UPDATE');
    });
}

deleteCompanies() {
  this.arrayIds = [];
  this.selection.selected.forEach(element => {
  this.arrayIds.push(element.id.toString());
  });
  this._companyService.deleteCompanies(this.arrayIds).subscribe(response => {
    this.getAllCompanies();
    this.selection.clear();
    this.deleteFlag = false;
    this.openSnackBar('Successfully deleted companies !', 'DELETE');
  });
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}

}

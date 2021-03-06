import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { Computer } from 'src/app/shared/model/computer.model';

import { PageEvent, MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ComputerCreateComponent } from '../computer-create/computer-create.component';
import { ComputerEditComponent } from '../computer-edit/computer-edit.component';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { HeaderHttpService } from 'src/app/shared/service/header-http.service';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: Computer[];
  deleteFlag: boolean;
  private searchMode = false;
  private searchString: string;
  pageEvent: PageEvent;
  length = 10;
  pageIndex = 0;
  pageSize = 10;
  arrayIds: string[];
  selection = new SelectionModel<Computer>(true, []);
  computer: Computer;
  constructor(
    private _headerHttpService: HeaderHttpService,
    private _router: Router,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
     private _computerService: ComputerService,
      public dialog: MatDialog,
       iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer ) {
    this.displayedColumns = ['name', 'introduced', 'discontinued', 'company', 'select'];
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

    if (localStorage.getItem('tokenCDB') == null) {
      this._router.navigate(['/login']);
    } else {
      this._headerHttpService.setHeaderByToken(localStorage.getItem('tokenCDB'));
    this.getPageNoSearch(this.pageIndex + 1, this.pageSize);
    }
  }

  disableButton(): boolean {
    return (localStorage.getItem('roleCDB') === 'ROLE_USER' );
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

  public getPage(event?: PageEvent) {
    if (this.searchMode) {
      this.getPageWithSearch(this.searchString, event.pageIndex + 1, event.pageSize);
    } else {
      this.getPageNoSearch(event.pageIndex + 1, event.pageSize);
    }
    return event;
  }

public refresh() {
  if (this.searchMode) {
    this.getPageWithSearch(this.searchString, this.pageIndex + 1, this.pageSize);
  } else {
    this.getPageNoSearch(this.pageIndex + 1, this.pageSize);
  }
  return event;
}

  private getPageNoSearch(index: number, size: number) {
    this._computerService.getAllComputersByPage(index, size).subscribe(response => {
      this.pageIndex = index - 1;
      this.pageSize = size;
      this.dataSource = response;
    });
    this._computerService.getCountComputers().subscribe(response => {
      this.length = response;
    });
  }

  private getPageWithSearch(search: string, index: number, size: number) {
    this._computerService.getAllComputersByNameByPage(search, index, size).subscribe(response => {
      this.pageIndex = index - 1;
      this.pageSize = size;
      this.dataSource = response;
    });
    this._computerService.getCountComputersByName(search).subscribe(response => {
      this.length = response;
    });
  }

  public applyFilter(filterValue: string) {
    if (filterValue === null || filterValue === '') {
      this.searchMode = false;
      this.pageIndex = 0;
      this.getPageNoSearch(this.pageIndex + 1, this.pageSize);
    } else {
      this.searchMode = true;
      this.searchString = filterValue;
      this.pageIndex = 0;
      this.getPageWithSearch(this.searchString, this.pageIndex + 1, this.pageSize);
    }
  }


  updateDialog(computerToUpdate: Computer): void {
    const dialogRef = this.dialog.open(ComputerEditComponent, {
      data: {computer: computerToUpdate}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.computer = result;
        if (this.computer.introduced != null) {
          this.computer.introduced = this.datePipe.transform(this.computer.introduced , 'yyyy-MM-dd');
        }
        if (this.computer.discontinued != null) {
        this.computer.discontinued = this.datePipe.transform(this.computer.discontinued , 'yyyy-MM-dd');
        }
        this.updateComputer(result);
      }
    });
  }

  createDialog(): void {
    this.computer = new Computer();
    const dialogRef = this.dialog.open(ComputerCreateComponent, {
      data: {computer: this.computer}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.computer = result;
        if (this.computer.introduced != null) {
          this.computer.introduced = this.datePipe.transform(this.computer.introduced , 'yyyy-MM-dd');
        }
        if (this.computer.discontinued != null) {
        this.computer.discontinued = this.datePipe.transform(this.computer.discontinued , 'yyyy-MM-dd');
        }
        this.addComputer(this.computer);
      }
    });
  }

  updateComputer(updateComputer: Computer) {
    this._computerService.updateComputer(updateComputer).subscribe(response => {
      this.refresh();
      this.openSnackBar('Successfully updated computer !', 'UPDATED');
    });
  }

  addComputer(newComputer: Computer) {
    this._computerService.addComputer(newComputer).subscribe(response => {
      this.refresh();
      this.openSnackBar('Successfully added computer !', 'ADD');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,

    });
  }

  deleteComputers() {
    this.arrayIds = [];
    this.selection.selected.forEach(element => {
    this.arrayIds.push(element.id.toString());
    });
    this._computerService.deleteComputers(this.arrayIds).subscribe(response => {
      this.refresh();
      this.selection.clear();
      this.deleteFlag = false;
      if (this.arrayIds.length === 0) {
        this.openSnackBar('Nothing to delete', 'DELETE');
      } else {
        this.openSnackBar('Successfully deleted computers', 'DELETE');
      }

    });
  }

}

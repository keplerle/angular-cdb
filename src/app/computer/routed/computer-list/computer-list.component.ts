import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { Computer } from 'src/app/shared/model/computer.model';

import { PageEvent, MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ComputerCreateComponent } from '../computer-create/computer-create.component';
import { ComputerEditComponent } from '../computer-edit/computer-edit.component';
import { DatePipe } from '@angular/common';

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

  computer: Computer;
  constructor(
    private datePipe: DatePipe,
     private _computerService: ComputerService,
      public dialog: MatDialog,
       iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer) {
    this.displayedColumns = ['name', 'introduced', 'discontinued', 'company'];
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
    this.getPageNoSearch(this.pageIndex + 1, this.pageSize);
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
        this.updateComputer(result);
        this.refresh();

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
        this.addComputer(this.computer);
        this.refresh();
      }
    });
  }

  updateComputer(updateComputer: Computer) {
    this._computerService.updateComputer(updateComputer).subscribe(response => {
      this.getPageNoSearch(this.pageIndex + 1, this.pageSize);
    });
  }

  addComputer(newComputer: Computer) {
    this._computerService.addComputer(newComputer).subscribe(response => {
      this.refresh();

    });
  }

}

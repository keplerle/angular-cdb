import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { Computer } from 'src/app/shared/model/computer.model';
import { PageEvent } from '@angular/material';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyCreateComponent } from 'src/app/company/routed/company-create/company-create.component';
import { ComputerCreateComponent } from '../computer-create/computer-create.component';
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
      this.getPageWithSearch(this.searchString, event.pageIndex + 1, event.pageIndex);
    } else {
      this.getPageNoSearch(event.pageIndex + 1, event.pageSize);
    }
    return event;
  }

  public refresh() {
    if (this.searchMode) {
      this.getPageWithSearch(this.searchString, this.pageIndex + 1, this.pageIndex);
    } else {
      this.getPageNoSearch(this.pageIndex + 1, this.pageSize);
    }
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

  createDialog(): void {
    this.computer = new Computer();
    const dialogRef = this.dialog.open(ComputerCreateComponent, {
      data: {computer: this.computer}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        this.computer = result;
        console.log(this.computer);
        if (this.computer.introduced != null) {
          this.computer.introduced = this.datePipe.transform( this.computer.introduced, 'yyyy-MM-dd');
        }
        if (this.computer.discontinued != null) {
          this.computer.discontinued = this.datePipe.transform( this.computer.discontinued, 'yyyy-MM-dd');
        }
        console.log(this.computer);
        this.addComputer(this.computer);
      }
    });
  }

  addComputer(newComputer: Computer) {
    this._computerService.addComputer(newComputer).subscribe(response => {
      this.refresh();
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { Computer } from 'src/app/shared/model/computer.model';
import { PageEvent, MatDialog } from '@angular/material';
import { ComputerCreateComponent } from '../computer-create/computer-create.component';
import { ComputerEditComponent } from '../computer-edit/computer-edit.component';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: Computer[];

  private searchMode = false;
  private searchString: string;

  pageEvent: PageEvent;
  length = 10;
  pageIndex = 0;
  pageSize = 10;
  computer: any;

  constructor(private _computerService: ComputerService, public dialog: MatDialog) {
    this.displayedColumns = ['name', 'introduced', 'discontinued', 'company'];
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
      console.log( this.dataSource );
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

  updateComputer(updateComputer: Computer) {
    this._computerService.updateComputer(updateComputer).subscribe(response => {
      this.getPageNoSearch(this.pageIndex + 1, this.pageSize);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { Computer } from 'src/app/shared/model/computer.model';
import { PageEvent } from '@angular/material';

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

  constructor(private _computerService: ComputerService) {
    this.displayedColumns = ['name', 'introduced', 'discontinued', 'company'];
   }



  ngOnInit() {
    this._computerService.getAllComputersByPage(this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.dataSource = response;
    });
    this._computerService.getCountComputers().subscribe(response => {
      this.length = response;
    });
  }

  public getPage(event?: PageEvent) {
    if (this.searchMode) {
      this.getPageWithSearch(this.searchString, this.pageIndex + 1, this.pageSize);
    } else {
      this.getPageNoSearch(event.pageIndex + 1, event.pageSize);
    }
    return event;
  }

  private getPageNoSearch(index: number, size: number) {
    this._computerService.getAllComputersByPage(index, size).subscribe(response => {
      this.pageIndex = index;
      this.pageSize = size;
      this.dataSource = response;
    });
    this._computerService.getCountComputers().subscribe(response => {
      this.length = response;
    });
  }

  private getPageWithSearch(search: string, index: number, size: number) {
    this._computerService.getAllComputersByNameByPage(search, index, size).subscribe(response => {
      this.pageIndex = index;
      this.pageSize = size;
      this.dataSource = response;
      console.log( this.dataSource );
    });
    this._computerService.getCountComputersByName(search).subscribe(response => {
      this.length = response;
    });
  }

  applyFilter(filterValue: string) {
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

}

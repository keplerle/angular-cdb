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
    this._computerService.getAllComputersByPage(event.pageIndex + 1, event.pageSize).subscribe(response => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.dataSource = response;
    });
    this._computerService.getCountComputers().subscribe(response => {
      this.length = response;
    });
    return event;
  }
}

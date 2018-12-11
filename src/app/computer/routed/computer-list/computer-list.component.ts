import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../shared/computer.service';
import { Computer } from 'src/app/shared/model/computer.model';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: Computer[];
  constructor(private _computerService: ComputerService) {
    this.displayedColumns = ['name', 'introduced', 'discontinued', 'company'];
   }

   private page: number;
   private pageSize: number;

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this._computerService.getAllComputersByPage(this.page, this.pageSize).subscribe(response => {
      this.dataSource = response;
    });
  }

  setPage(page: number) {
    this.page = page;
    this._computerService.getAllComputersByPage(this.page, this.pageSize).subscribe(response => {
      this.dataSource = response;
    });
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    this._computerService.getAllComputersByPage(this.page, this.pageSize).subscribe(response => {
      this.dataSource = response;
    });
  }

}

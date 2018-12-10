import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from '../../shared/company.service';

export interface PeriodicElement {
  name: string;
}
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource: Company[];
  constructor(private _companyService: CompanyService) {
    this.displayedColumns = ['name'];
   }

  ngOnInit() {
    this._companyService.getAllCompanies().subscribe(response => {
      this.dataSource = response;
    });
  }

}

import { Component } from '@angular/core';
import { ModifiersLocationData, ModifiersLocationPage } from '../../../modifiers-interface/modifiers.interface';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModifiersConst } from '../../../modifiers-const/modifiers.const';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifiers-tab-locations',
  standalone: true,
  imports: [FormsModule,CommonModule,MatTableModule,MatPaginatorModule, NgxPaginationModule, MatSortModule],
  templateUrl: './modifiers-tab-locations.component.html',
  styleUrl: './modifiers-tab-locations.component.scss'
})
export class ModifiersTabLocationsComponent {

    rows: ModifiersLocationData[] = []
    columns: string[] = [];
    isAllSelected: boolean = false;
    dropDownSelectedValue: string = '10';
    itemTabsConst = new ModifiersConst();
    
    page = new ModifiersLocationPage;

    constructor(){
      this.columns = this.itemTabsConst.locationsColumns;
      this.rows = this.itemTabsConst.modifiersLocationData;
    }

     sortData(sort: Sort): void {
        sort;
      }

      RecordPerPage(): void {
        if (this.dropDownSelectedValue != this.page.itemPerPage?.toString()) {
          if (this.dropDownSelectedValue == 'All') {
            this.page.itemPerPage = this.rows.length;
          } else {
            this.page.itemPerPage = parseInt(this.dropDownSelectedValue);
          }
        }
      }
       // below function is use to serer side pagination
  changePage(pageNumber: number): void {
    if (pageNumber) {
      this.page.pageNumber = pageNumber
    }
  }
}

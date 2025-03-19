import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecommendationTabsConst } from '../item-tabs-consts/item-tabs-const';
import { CommonModule } from '@angular/common';
import { ItemRecommendationData } from '../item-tabs-interfaces/item-tabs-interface';

@Component({
  selector: 'app-recommended-items-tab',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, MatSortModule],
  templateUrl: './recommended-items-tab.component.html',
  styleUrl: './recommended-items-tab.component.scss'
})
export class RecommendedItemsTabComponent {
  categoryTag: string = '';
  searchTag: string = '';
  columns: string[] = [];
  rows: ItemRecommendationData[] = [];
  paging: string[] = ['10', '15', '20', '50', 'ALl']
  dropDownSelectedValue: string = '10';
  itemPerPage: number = 10;
  recommendationConst = new RecommendationTabsConst()
  page: number = 1;
  constructor() {
    this.columns = this.recommendationConst.recommendationColumn
    this.rows = this.recommendationConst.recommendationRows;
  }


  RecordPerPage(): void {
    if (this.dropDownSelectedValue != this.itemPerPage?.toString()) {
      if (this.dropDownSelectedValue == 'All') {
        this.itemPerPage = this.rows.length;
      } else {
        this.itemPerPage = parseInt(this.dropDownSelectedValue);
      }
    }
  }

  sortData(sort: Sort): void {
    sort;
  }

}

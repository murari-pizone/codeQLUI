import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSortModule, Sort } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ItemTabsConst } from '../item-tabs-consts/item-tabs-const';
import { ItemLocationData } from '../item-tabs-interfaces/item-tabs-interface';

@Component({
  selector: 'app-item-locations',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, MatSortModule],
  templateUrl: './item-locations.component.html',
  styleUrl: './item-locations.component.scss'
})
export class ItemLocationsComponent {
  searchName: string = '';
  dropDownSelectedValue: string = '10';
  itemPerPage: number = 10;
  previousSortDirection: string = '';
  searchBrand: string = '';
  searchTag: string = '';
  page: number = 1;
  rows: ItemLocationData[] = []
  itemTabsConst = new ItemTabsConst();
  columns: string[] = [];
  isAllSelected: boolean = false;
  @ViewChild('EditCategory', { static: true }) EditCategory!: ElementRef;

  constructor(readonly popup: MatDialog) {
    this.columns = this.itemTabsConst.columns;
    this.rows = this.itemTabsConst.rows;
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

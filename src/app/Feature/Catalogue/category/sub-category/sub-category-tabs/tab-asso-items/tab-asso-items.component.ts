import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CategoryConst } from '../../../const/category.const';
import { ConfirmationComponent } from '../../../../../../Shared/popup/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { SortDataBuilder } from '../../../component/category-logic.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { AssociateItem } from '../../../interface/category.interface';

@Component({
  selector: 'app-tab-asso-items',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, MatSortModule],
  templateUrl: './tab-asso-items.component.html',
  styleUrl: './tab-asso-items.component.scss'
})
export class TabAssoItemsComponent {

  searchName: string = '';
  dropDownSelectedValue: string = '10';
  itemPerPage: number = 10;
  previousSortDirection: string = '';
  searchBrand: string = '';
  searchTag: string = '';
  page: number = 1;
  columns = ['Name', 'assoLocation', 'assoBrand', 'price'];
  @ViewChild('EditCategory', { static: true }) EditCategory!: ElementRef;

  constructor(public readonly catConst: CategoryConst, readonly popup: MatDialog) {

  }

  cancelChanges(): void {
    const popupRes = this.popup.open(ConfirmationComponent, {
      data: {
        description:
          'Are you sure you want to navigate away from the page and discard the unsaved changes?',
        title: 'Changes Made',
        hideCrossIcon: true,
      },
    });
    popupRes.afterClosed().subscribe((item: boolean) => {
      if (item) {
        this.removeDrawer();
      }
    });
  }

  removeDrawer(): void {
    SortDataBuilder.removeDrawer(this.EditCategory as ElementRef<HTMLElement>);
  }

  setParentCategory(name: string): void {
    console.log('name', name);
  }

  RecordPerPage(): void {
    if (this.dropDownSelectedValue != this.itemPerPage?.toString()) {
      if (this.dropDownSelectedValue == 'All') {
        this.itemPerPage = this.catConst.editCategory[0].associatedItems.length;
      } else {
        this.itemPerPage = parseInt(this.dropDownSelectedValue);
      }
    }
  }

  sortData(sort: Sort): void {
    const data: AssociateItem[] =
      this.catConst.editCategory[0].associatedItems.slice();
    if (sort.direction === '') {
      sort.direction = this.previousSortDirection == 'asc' ? 'desc' : 'asc';
    } else if (this.previousSortDirection == sort.direction) {
      sort.direction = sort.direction === 'asc' ? 'desc' : 'asc';
    }
    // using logic service function here to sort data
    const sortedArray = SortDataBuilder.getSortedData(data, sort);
    this.catConst.editCategory[0].associatedItems = sortedArray;
    this.previousSortDirection = sort.direction;
  }
}

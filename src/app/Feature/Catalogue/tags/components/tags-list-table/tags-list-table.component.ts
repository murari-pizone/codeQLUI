import { Component } from '@angular/core';
import { FilterComponent } from '../../../../../Shared/filter/filter.component';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagsItem, TagsListPage } from '../../interface/tags.interface';
import { TagsConstant } from '../../const/tags.constant';
import { TagsModalComponent } from '../tags-modal/tags-modal.component';

@Component({
  selector: 'app-tags-list-table',
  standalone: true,
  imports: [FilterComponent, MatTableModule, NgxPaginationModule, FormsModule, CommonModule, TagsModalComponent],
  templateUrl: './tags-list-table.component.html',
  styleUrl: './tags-list-table.component.scss',
  providers: [TagsConstant]
})
export class TagsListTableComponent {

  dropDownSelectedValue: string = '10';
  page = new TagsListPage;
  pageItem: string[] = ['10', '15', '20', '50', '100', 'All']

  rows: TagsItem[] = [
    { srNo: 1, tagsName: 'Beverages', assoItems: 120, assoModi: 15 },
    { srNo: 2, tagsName: 'Snacks', assoItems: 85, assoModi: 10 },
    { srNo: 3, tagsName: 'Desserts', assoItems: 45, assoModi: 5 },
    { srNo: 4, tagsName: 'Vegetarian', assoItems: 200, assoModi: 25 },
    { srNo: 5, tagsName: 'Non-Vegetarian', assoItems: 180, assoModi: 20 },
    { srNo: 6, tagsName: 'Breakfast', assoItems: 75, assoModi: 8 },
    { srNo: 7, tagsName: 'Lunch', assoItems: 150, assoModi: 18 },
    { srNo: 8, tagsName: 'Dinner', assoItems: 170, assoModi: 22 },
    { srNo: 9, tagsName: 'Combo Meals', assoItems: 65, assoModi: 7 },
    { srNo: 10, tagsName: 'Healthy Options', assoItems: 90, assoModi: 12 },
  ];

  columns: string[] = [];
  showSideBar: boolean = false;
  currentRow!: TagsItem;

  constructor(public constant: TagsConstant) {
    this.columns = this.constant.columns
  }

  filter(item: any): void {
    console.log('itme', item)
  }

  // Below function is use to set new page after page change
  RecordPerPage(): void {
    this.page.pageNumber = 1;
    if (this.dropDownSelectedValue != this.page.itemPerPage?.toString()) {
      if (this.dropDownSelectedValue == 'All') {
        this.page.itemPerPage = this.rows.length
      } else {
        this.page.itemPerPage = parseInt(this.dropDownSelectedValue)
      }
    }
  }

  // below function is use to serer side pagination
  changePage(pageNumber: number): void {
    if (pageNumber) {
      this.page.pageNumber = pageNumber;
    }
  }

  // when click on button and target modal 
  openEditSideBar(row?: TagsItem): void {
    if (row) {
      this.currentRow = row;
      this.showSideBar = true;
    }
  }

}

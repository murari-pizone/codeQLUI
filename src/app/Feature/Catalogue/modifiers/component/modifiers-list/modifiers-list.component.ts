import { Component, Inject, OnInit } from '@angular/core';
import { InlineErrorMsgComponent } from '../../../../../Shared/inline-error-msg/inline-error-msg.component';
import { CloseError } from '../../../../../Core/services/common.service';
import { FilterComponent } from '../../../../../Shared/filter/filter.component';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListPage, ModifierCustomError, ModifiersRowData } from '../../modifiers-interface/modifiers.interface';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModifiersConst } from '../../modifiers-const/modifiers.const';
import { MODIFIER_LIST_TOKEN } from '../../../catalogue.module';
import { IGetAllModifiers } from '../../modifiers-service/modifiers-service.interface';
import { ModifiersService } from '../../modifiers-service/modifiers-service.service';
import { ModifiersModalComponent } from '../modifiers-modal/modifiers-modal.component';

@Component({
  selector: 'app-modifiers-list',
  standalone: true,
  imports: [InlineErrorMsgComponent, FilterComponent, MatTableModule, CommonModule, FormsModule, MatPaginatorModule, NgxPaginationModule, MatSortModule, ModifiersModalComponent],
  templateUrl: './modifiers-list.component.html',
  styleUrl: './modifiers-list.component.scss',
  providers: [ModifiersConst, ModifiersService]
})
export class ModifiersListComponent implements OnInit {

  errorMsg: string = ''
  isErrorOccur: boolean = false;
  loading: boolean = false;
  numberOfSkeletonForDataTable: any[] = Array(8).fill(0);
  page = new ListPage;
  rows: ModifiersRowData[] = []
  columns: string[] = []
  dropDownSelectedValue: string = '10';
  pageItem: string[] = ['10', '15', '20', '50', '100', 'All']
  showSideBar: boolean = false;

  constructor(public constant: ModifiersConst, @Inject(MODIFIER_LIST_TOKEN) private readonly service: IGetAllModifiers) {
    this.columns = this.constant.columns
  }

  // life cycle hook of angular 
  ngOnInit(): void {
    this.setPage()
  }

  // fot getting initially data 
  setPage(): void {
    this.loading = true;
    this.service.getAllModifiers().subscribe({
      next: (response: ModifiersRowData[]) => {
        this.loading = false;
        this.rows = response
        this.page.totalItems = this.rows.length;
      },
      error: (error: ModifierCustomError) => {
        this.errorMsg = error.customMessage ?? '';
        this.loading = false;
      }
    })
  }

  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMsg, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMsg = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
  }

  // filter code 
  filter(value: string): void {
    console.log(value)
  }

  // below function is use to sorting based on columns
  sortData(sort: Sort): void {
    console.log(sort)
  }

  // when click on button and target modal 
  openEditSideBar(row?: ModifiersRowData): void {
    row
    this.showSideBar = true;
  }

  // below function is use to serer side pagination
  changePage(pageNumber: number): void {
    if (pageNumber) {
      this.page.pageNumber = pageNumber
      // this.setPage({PageNumber : this.page.pageNumber , itemPerPage : this.page.itemPerPage});
    }
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

  empty(): void {
    console.log('empty');
  }
}

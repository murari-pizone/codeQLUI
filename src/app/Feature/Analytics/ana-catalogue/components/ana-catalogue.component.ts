import { Component } from '@angular/core';
import { InlineErrorMsgComponent } from '../../../../Shared/inline-error-msg/inline-error-msg.component';
import { CloseError } from '../../../../Core/services/common.service';
import { FilterComponent } from '../../../../Shared/filter/filter.component';
import { AnaCatalogueConstant } from '../const/ana-catalogue.const';
import { AnaCatalogueTab, AnaRows } from '../interface/ana-catalogue.interface';
import { CommonModule } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ana-catalogue',
  standalone: true,
  imports: [InlineErrorMsgComponent, FilterComponent, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, MatSortModule,FormsModule],
  templateUrl: './ana-catalogue.component.html',
  styleUrl: './ana-catalogue.component.scss',
  providers:[AnaCatalogueConstant]
})
export class AnaCatalogueComponent {

  errorMsg: string = ''
  isErrorOccur: boolean = false;

  currentTabIndex: number = 0;
  visibleTabs: number = 4;
  currentStep: string = 'Category Performance';

 tabs: AnaCatalogueTab[];
 itemPerPage: number = 10;
 page: number = 1;
 dropDownSelectedValue: string = '10';
 rows: AnaRows[];
 columns:string[];


   constructor(public constant: AnaCatalogueConstant) {
     this.tabs = this.constant.AnaCatalogueTabs;
     this.rows = this.constant.rows;
     this.columns = this.constant.columns;
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

  empty(): void {
    console.log('empty');
  }

sortData(sort: Sort): void {
    sort;
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

}

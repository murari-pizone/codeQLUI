import { Component, Inject, OnInit } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { CloseError } from '../../../../../Core/services/common.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppLoggerModule } from '../../../../../Core/logger.module';
import { FilterComponent } from '../../../../../Shared/filter/filter.component';
import { InlineErrorMsgComponent } from '../../../../../Shared/inline-error-msg/inline-error-msg.component';
import { LoaderComponent } from '../../../../../Shared/loader/loader.component';
import { TaxesConstant } from '../../const/taxes-constant';
import { TaxesRowData } from '../../interface/taxes-interface';
import { IGetAllTaxes } from '../../service/taxes-interface-service';
import { TAXES_LIST_TOKEN } from '../../../catalogue.module';
import { TaxesListService } from '../../service/taxes-service';
import { itemsConstant } from '../../../items/const/items.constant';
import { TexesModalComponent } from "../texes-modal/texes-modal.component";

@Component({
  selector: 'app-texes-list',
  standalone: true,
  imports: [InlineErrorMsgComponent, AppLoggerModule, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule,
    LoaderComponent, FormsModule, InlineErrorMsgComponent, MatSortModule, MatButtonModule, MatMenuModule,  FilterComponent, TexesModalComponent],
  templateUrl: './texes-list.component.html',
  styleUrl: './texes-list.component.scss',
  providers : [TaxesListService,TaxesConstant,itemsConstant]
})
export class TexesListComponent implements OnInit {
  columns : string[] = []
  rows : TaxesRowData[] = []
  currentRow! : TaxesRowData
  errorMsg : string = ''
  isErrorOccur : boolean = false;
  loading : boolean = false;
  showSideBar : boolean = false;
  // Static value for drop downs
  numberOfSkeletonForDataTable: any[] = Array(8).fill(0)
  // related to pagination
  itemPerPage : number = 15;
  page : number = 1;
  dropDownSelectedValue : string = '15';
  loadingSpinner : boolean = false

  constructor(public constant : TaxesConstant , @Inject (TAXES_LIST_TOKEN) private readonly service : IGetAllTaxes){
    this.columns = this.constant.columns
  }

  // life cycle hook of angular 
  ngOnInit(): void {
    this.setPage()
  }

  // fot getting initially data 
  setPage():void{
    this.loading = false;
    this.service.getAllTaxes().subscribe({
      next : (response : TaxesRowData[]) => {
        this.loading = true; 
        this.rows = response
      },
      error : (error) => {
        this.errorMsg = error as string
      }
    })
  }
  // When click on close icon on inline error message
  closeInlineError():void{
    const errorState = { errorMessages: this.errorMsg, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMsg = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
  }

  // sorting data 

  // below function is use to sorting based on columns
  sortData(sort: Sort): void {
    console.log(sort)
  }

  // Below function is use to set new page after page change
  RecordPerPage() : void{
    if (this.dropDownSelectedValue != this.itemPerPage?.toString()) {
      if(this.dropDownSelectedValue == 'All'){
        this.itemPerPage = this.rows.length
      }else{
        this.itemPerPage = parseInt(this.dropDownSelectedValue)
      }
    } 
  }

   // filter code 
   filter(value:string):void{
   console.log(value)
  }

  // when click on button and target modal 
  openEditSideBar(row?:TaxesRowData):void{
    if(row){
      this.currentRow = row;
      this.showSideBar = true;
    }
  }

  // close side modal
  closeSideBar():void{
    this.showSideBar = false;
  }
}

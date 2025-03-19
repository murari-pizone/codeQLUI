import { Component, Inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from '../../../Shared/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemData, LoadingTable, MenuData } from '../../sync-menu/management/interface/sync-menu-interface';
import { SuccessComponent } from '../../../Shared/popup/success/success.component';
import { MatDialog } from '@angular/material/dialog';
import {  SupportData, Page } from './interface/orderError-interface';

import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule, Sort } from '@angular/material/sort';
import { StatusColorPipe } from '../../../Shared/pipes/status-color.pipe';
import { MatTableModule } from '@angular/material/table';
import { OrderErrorConst } from './const/orderError.const';
import { FilterComponent } from '../../../Shared/filter/filter.component';
import { CommonResponseJson } from '../../../Shared/const/common.constant';
import { InlineErrorMsgComponent } from "../../../Shared/inline-error-msg/inline-error-msg.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import   GlobalInterceptor from '../../../Core/interceptors/global.interceptor';
import { ORDERS_ERROR_TOKEN } from '../orders.module';
import { IGetOrderError } from '../error-handling/service/order-error-service.interface';
import { orderErrorService } from './service/order-error-service';
import { CloseError } from '../../../Core/services/common.service';
import { SYNC_MENU_SERVICE_TOKEN } from '../../sync-menu/sync-menu.module';
import { IGetSyncData } from '../../sync-menu/management/service/sync-menu-service-interface';
import { SyncMenuService } from '../../sync-menu/management/service/sync-menu-service';
import { CustomError } from '../../authentication/interface/login-interface';

@Component({
  selector: 'app-order-error',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, MatCardModule, MatIconModule, MatSlideToggleModule,NgxPaginationModule, MatSortModule, FilterComponent, StatusColorPipe, MatTableModule, InlineErrorMsgComponent],
  templateUrl: './order-error.component.html',
  styleUrl: './order-error.component.scss',
  providers: [StatusColorPipe, OrderErrorConst,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true, // This allows multiple interceptors
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    { provide: ORDERS_ERROR_TOKEN, useClass: orderErrorService },
    { provide: SYNC_MENU_SERVICE_TOKEN, useClass: SyncMenuService },
  ],
})
export class OrderErrorComponent implements OnInit {

  syncErrorData: ItemData[] = [];
  errorMessage: string  = '';    // General error message for login
  isErrorOccur : boolean = false
  loadingSpinner: boolean = false;
  loadingSkeleton : boolean = false;
  loading:boolean = false;
  loadingTable:LoadingTable={ view: [], sync: [], trackProgress: [] };
  errorCode: number | undefined;
  numberOfSkeletonForOrder: any[] = Array(10).fill(0)
  columns: string[]
  rows = this.orderErrorConst.orderErrorStaticData;
  rowsClone =  [];
  page = new Page;
  dropDownSelectedValue: string = '10';
  filterDropDownValue : string = 'All'
  loadingText: string='';

  // Add more shop objects as needed
  constructor(@Inject(ORDERS_ERROR_TOKEN) private orderService: IGetOrderError, readonly orderErrorConst: OrderErrorConst,
    private readonly popup: MatDialog,
  @Inject(SYNC_MENU_SERVICE_TOKEN) private readonly service :  IGetSyncData) {
    this.columns = this.orderErrorConst.columnName;
    this.page.itemPerPage = 10;
    this.page.pageNumber = 1;
  }

  ngOnInit(): void {
    this.getSyncError();
  }

  // getting initially data for row
  getSyncError(): void {
    this.closeInlineError();
    this.loadingSkeleton = true;
    // const json = { "Region": "CHI", "ShopCode": "6", "aggregator_name":'swiggy'};
    // this.rows = 
    // this.orderService.getOrderError(json).subscribe({
    //   next : (response : CommonResponseJson) => {
    //     this.loadingSpinner = false;
    //     if (response.success === 'OK') {
    //       this.rows = response['data'];
    //       this.rowsClone = this.rows;
    //     }
    //   },
    //   error : (error : CustomError) => {
    //     this.isErrorOccur = true;
    //     this.errorMessage = error['customMessage'] ? error['customMessage'] : error.error?.error as string
    //     this.loadingSkeleton = false;
    //   }
    // })

  }

  // code for syncing single error
  syncError(index: number): void {
    this.closeInlineError();
    this.syncErrorData[index].status = 'syncing';
    const json : {Region:string,ShopCode:string,aggregator_name:string} = { "Region": "CHI", "ShopCode": "26", "aggregator_name":'swiggy'};
    // using temporary api will change after
    this.orderService.getOrderError(json).subscribe({
      next : (response : CommonResponseJson) => {
        this.loadingSpinner = false;
          if (response.success === this.orderErrorConst.OK) {
            this.syncErrorData[index].status = this.orderErrorConst.NotSync
          }
      },
      error : (error : CustomError) => {
        this.syncErrorData[index].status = this.orderErrorConst.NotSync
        this.isErrorOccur = true;
        this.errorMessage = error['customMessage'] ? error['customMessage'] : error.error?.error as string
        this.loadingSpinner = false;
      }
    })
  }

  // syncing all records of data table
  syncAllData(): void {
    this.loadingSpinner = true;
    setTimeout(() => {
      this.loadingSpinner = false;
    }, 3000);
  }

  contactSupport(contactData: ItemData): void {
    const supportData: SupportData = {
      ErrorCode: contactData.CategoryId,
      Timestamp: contactData.syncTime,
    }
    // Logic to open support/contact section
    this.popup.open(SuccessComponent, {
      data: {
        description: this.orderErrorConst.contactContext, title: this.orderErrorConst.contactTitle,
        contactData: supportData
      }
    });
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
    if (this.dropDownSelectedValue != this.page.itemPerPage?.toString()) {
      this.page.itemPerPage = parseInt(this.dropDownSelectedValue)
    }
  }

  sortData(sort: Sort): void {
    console.log('ero', sort)
  }

  onPushButtonClick(): void {
    //pending
  }
  
  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMessage ?? '', isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMessage = errorState.errorMessages ?? '';
    this.isErrorOccur = errorState.isErrorOccur;
  }
  
  // filter code 
  filter(value:string):void{
    if (value.trim() !== '') {
      // const searchTerm = value.toLowerCase();
      // this.rows = this.rowsClone.filter(row => row.CountryName.includes(searchTerm));
    }else{
      this.rows = this.rowsClone
    }
  }

  // when change Filter drop down value
  changeDropDownValue(value:string):void{
    if(value != this.filterDropDownValue ){
      this.filterDropDownValue = value
    }
  }
  // Below function is use to get customized popup for sync and verify
  openConfirmationPopup(index:number):void{
      this.syncingData(index);
    // }
   }

  syncingData(index:number): void {
    this.loading = true;
    this.loadingTable.view[index] = true;
    this.service.syncData(['1']).subscribe({
      next: (data: MenuData) => {
        this.loading = false;
        this.loadingTable.view[index] = false;
        this.popup.open(SuccessComponent, {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: {
            title: 'this.title', description: 'this.context', completeJson: data.data, hideCancelButton: true, customizeNameForSave: 'Sync',
            aggregatorData: null
          }, disableClose: true
        })
      },
      error: (error: CustomError) => {
        this.isErrorOccur = true;
        this.errorMessage = error.customMessage ?? '';
        this.loadingTable.view[index] = false;
        this.loading = false
      }
    });
  }
}
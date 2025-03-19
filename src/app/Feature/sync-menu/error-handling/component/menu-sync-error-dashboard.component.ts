import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterDropDataValues, MenuData, SyncMenuErrorBody } from '../../management/interface/sync-menu-interface';
import { SyncMenuErrorService } from '../../../../Core/services/syncMenuError.service';
import { LoaderComponent } from '../../../../Shared/loader/loader.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule } from '@angular/material/sort';
import { FilterComponent } from '../../../../Shared/filter/filter.component';
import { StatusColorPipe } from '../../../../Shared/pipes/status-color.pipe';
import { MatTableModule } from '@angular/material/table';
import { SyncMenuErrorConst } from '../const/syncMenuError.const';
import { AggregatorList, CommonResponseJson, ErrorJson, MenuErrorRow, Page } from '../interface/menuSyncError-interface';
import { InlineErrorMsgComponent } from "../../../../Shared/inline-error-msg/inline-error-msg.component";
import { MatDialog } from '@angular/material/dialog';
import { ToastrService as ToasterService } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import GlobalInterceptor from '../../../../Core/interceptors/global.interceptor';
import { MenuErrorLogic } from './menu-sync-logic.service';
import { SYNC_ERROR_DASHBOARD_SERVICE_TOKEN, SYNC_MENU_SERVICE_TOKEN } from '../../sync-menu.module';
import { IEGetSyncData, IGetSyncError } from '../service/menu-error.interface';
import { CloseError } from '../../../../Core/services/common.service';
import { DateFormatPipe } from '../../../../Shared/pipes/date-format.pipe';
import { SuccessComponent } from '../../../../Shared/popup/success/success.component';
import { SyncMenuConstant } from '../../management/const/sync-menu.const';
import { IGetSyncData } from '../../management/service/sync-menu-service-interface';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CustomError } from '../../../authentication/interface/login-interface';

@Component({
  selector: 'app-menu-sync-error-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, MatCardModule, MatIconModule, MatSlideToggleModule, NgxPaginationModule, MatSortModule, FilterComponent, MatTableModule, InlineErrorMsgComponent, DateFormatPipe,
    ClipboardModule
  ],
  templateUrl: './menu-sync-error-dashboard.component.html',
  styleUrl: './menu-sync-error-dashboard.component.scss',
  providers: [StatusColorPipe, SyncMenuErrorConst, ToasterService, SyncMenuErrorService, DateFormatPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true, // This allows multiple interceptors
    },
  ],
})
export class MenuSyncErrorDashboardComponent implements OnInit {
  constant = SyncMenuConstant
  isErrorOccur: boolean = false;
  errorMessage: string = ''; // General error message for login
  loadingSpinner: boolean = false;
  columns: string[];
  page = new Page();

  paginationDropDownSelectedValue: string = this.menuErrorConst.ten;
  filterDropDownValue: string = this.menuErrorConst.All;
  loadingText: string = this.menuErrorConst.Loading;

  rows: MenuErrorRow[] = [];
  cloneData: MenuErrorRow[] = [];
  currentRowData!: MenuErrorRow;
  customizeNameForSave: string = '';
  shopCodeArray: number[] = [];

  masterShowFlag: boolean = false;

  optionsList = this.menuErrorConst.optionList;
  menuCaptionList = this.menuErrorConst.menuCaptionList;
  regionList = this.menuErrorConst.regionList;
  onlinePartnerList = this.menuErrorConst.onlinePartnerList;
  option: string = '';
  menuCaption: string = '';
  region: string = '';
  onlinePartner: string = '';
  formError: string = '';
  isFormError: boolean = false;
  showDataTable: boolean = false;

  aggregatorsList: AggregatorList[] = [];
  title: string = '';
  context: string = '';
  constructor(
    @Inject(SYNC_ERROR_DASHBOARD_SERVICE_TOKEN) private readonly syncService: IGetSyncError & IEGetSyncData,
    readonly menuErrorConst: SyncMenuErrorConst,
    readonly popup: MatDialog,
    readonly toaster: ToasterService,
    @Inject(SYNC_MENU_SERVICE_TOKEN) private readonly service: IGetSyncData
  ) {
    this.columns = this.menuErrorConst.columns;
    this.page.pageSize = 10;
    this.page.currentPage = 1;
    const storedAggregators = localStorage.getItem('aggregatorList');
    if (storedAggregators) {
      this.aggregatorsList = JSON.parse(storedAggregators) as AggregatorList[];
      this.aggregatorsList = this.aggregatorsList.map((item) => ({
        ...item,
        isChecked: false,
      }));
    }
  }

  ngOnInit(): void {
    this.getSyncError(this.page.currentPage, this.page.pageSize);
  }

  // initially getting a list of errors
  getSyncError(pageNumber: number, limit: number): void {
    this.closeInlineError();
    this.loadingSpinner = false;
    this.syncService.getSyncError(pageNumber, limit).subscribe({
      next: (response: CommonResponseJson) => {
        this.loadingSpinner = false;
        if (response) {
          this.handleSyncErrorResponse(response)
        }
      },
      error: (error: CustomError) => {
        this.handleSyncError(error);
      },
    });
  }

  handleSyncErrorResponse(response: CommonResponseJson):void{
    this.rows = response.data;
    this.cloneData = response.data;
    this.setCopyError()
    // this.page = response.pagination;
    this.updateTimestamps();
    this.createShopCodeArray();
  }

  handleSyncError(error: CustomError):void{
    this.isErrorOccur = true;
    this.loadingSpinner = false
    this.errorMessage = error.customMessage ? error.customMessage : error.error?.error as string;
  }

  // creating a shop code array
  createShopCodeArray(): void {
    if (this.rows) {
      this.shopCodeArray = [...new Set(this.rows.map((row) => row?.shop_code))];
    }
  }

  // Below function is use to set new page after page change
  RecordPerPage(): void {
    if (
      this.paginationDropDownSelectedValue &&
      this.paginationDropDownSelectedValue !==
        this.page.currentPage.toString() &&
      this.paginationDropDownSelectedValue !== this.menuErrorConst.All
    ) {
      this.page.pageSize = parseInt(this.paginationDropDownSelectedValue);
    } else if (
      this.paginationDropDownSelectedValue === this.menuErrorConst.All
    ) {
      this.page.pageSize = this.page.totalItems;
    }
    this.getSyncError(this.page.currentPage, this.page.pageSize);
  }

  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMessage, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMessage = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
  }

  // when change Filter drop down value
  changeDropDownValue(value: string): void {
    if (value != this.filterDropDownValue) {
      this.filterDropDownValue = value;
    }
  }

  // when click on sync button
  // Below function is use to get customized popup for sync and verify
  openConfirmationPopup(row: MenuErrorRow, title?: string): void {
    title;
    this.customizeNameForSave = this.menuErrorConst.Proceed;
    if (row) {
      row['status'] = 'NotSydnc';
    }
    setTimeout(() => {
      row['status'] = 'NotSync';
      this.toaster.success('', this.menuErrorConst.Syncing_successful, {
        timeOut: 3500,
        progressBar: true,
        positionClass: this.menuErrorConst.toast_top_center,
      });

    }, 2000);
    // if (row) {
    //   this.currentRowData = row;
    // }
    // if (title) {
    //   const popUp = this.popup.open(SuccessComponent, {
    //     data: {
    //       title: title, description: '', data: [], hideCancelButton: true, customizeNameForSave: this.customizeNameForSave,
    //       aggregatorData: {
    //         aggregatorList: this.aggregatorsList,
    //         showAggregatorList: true,
    //       },
    //     },
    //     disableClose: true,
    //   });
    //   popUp.afterClosed().subscribe((data: SyncPopupResponse) => {
    //     if (data.success && data.aggregatorList) {
    //       this.aggregatorsList = data.aggregatorList;
    //       this.syncingData();
    //     }
    //   });
    // }
  }

  // syncing record
  syncingData(): void {
    if (this.currentRowData) {
      this.loadingSpinner = true;
      this.loadingText = this.menuErrorConst.Syncing;
      this.syncService.syncData(this.currentRowData?.shop_code).subscribe({
        next: () => {
        this.handleSyncingData()
        },
        error: (error: SyncMenuErrorBody) => {
         this.handleSyncingError(error);
        },
        complete: () => {
          this.loadingSpinner = false;
        },
      });
    }
  }
  handleSyncingData():void{
    this.loadingSpinner = false;
    this.toaster.success('', this.menuErrorConst.Syncing_successful, {
      timeOut: 3500,
      progressBar: true,
      positionClass: this.menuErrorConst.toast_top_center,
    });
  }

  handleSyncingError(error: SyncMenuErrorBody):void{
    console.error(this.menuErrorConst.fetchingError, error);
    this.isErrorOccur = true;
    this.errorMessage = error?.message;
    this.aggregatorsList.forEach((item) => (item.isChecked = false));
    this.loadingSpinner = false;
  }

  // below function is use to serer side pagination
  changePage(pageNumber: number): void {
    if (pageNumber) {
      this.page.currentPage = pageNumber;
      this.getSyncError(this.page.currentPage, this.page.pageSize);
    }
  }

  parseErrors(item: MenuErrorRow | null, master?: boolean): ErrorJson[] | undefined {
    if (item?.error) {
      // return this.safelyParseErrors(item.error);
    } else if (master && this.rows?.length) {
      this.rows.forEach((row: MenuErrorRow) => {
        // row.ErrorJson = this.safelyParseErrors(row?.error) || [];
        row.isShowComplexColumn = true;
      });
    }
    return undefined;
  }

  safelyParseErrors(rawErrorString: string): ErrorJson[] | undefined {
    try {
      const parsedErrors = JSON.parse(rawErrorString) as ErrorJson[];
      return parsedErrors.map((error) => ({
        error_field: error?.error_field.replace(/->/g, ' > '),
        rejected_value: error?.rejected_value || 'None',
        message: error?.message,
      }));
    } catch {
      console.error(this.menuErrorConst.Failed_to_parse_error);
      return undefined;
    }
  }

  // show complex column
  showError(item: MenuErrorRow): void {
    if (item) {
      item.isShowComplexColumn = true;
      // item.ErrorJson = this.safelyParseErrors(item.error) || [];
      this.masterShowFlag = true;
    }
  }

  // when click on master collapse
  masterShow(): void {
    this.masterShowFlag = true;
    // this.parseErrors(null, true);
  }

  // when click on master expand
  masterHide(): void {
    this.masterShowFlag = false;
    this.rows.forEach((item) => {
      // item.ErrorJson = [];
      item.isShowComplexColumn = false;
    });
  }

  // hide complex column
  hideError(item: MenuErrorRow): void {
    if (item) {
      item.isShowComplexColumn = false;
      // item['ErrorJson'] = [];
      this.masterShowFlag = this.rows.some((row) => row?.isShowComplexColumn);
    }
  }

  // Function to update the timestamps for all rows in the array
  updateTimestamps(): void {
    MenuErrorLogic.updateTimestamps(this.rows);
  }

  empty(): void {
    console.log('');
  }

  // when click on next in basic form
  onSubmit(): void {
    if (this.option && this.menuCaption && this.region && this.onlinePartner) {
      this.getSyncError(this.page.currentPage, this.page.pageSize);
      this.showDataTable = true;
    } else {
      this.isFormError = true;
      this.formError = this.menuErrorConst.Please_select_value;
    }
  }

  // when click on back button
  back(): void {
    this.showDataTable = false;
    this.option = '';
    this.menuCaption = '';
    this.region = '';
    this.onlinePartner = '';
  }

  // when value is selected in drop down
  valueSelected(): void {
    this.isFormError = false;
    this.formError = '';
  }

  // submit for region , menu-caption , online partner filter
  submitFilter(event: FilterDropDataValues): void {
    console.log(event);
  }
  // filter sync menu error based on order items
  filter(value: string): void {
    if (value) {
      console.log(value)
    }
  }

  viewItem(): void {
    this.title = this.constant.confirmation;
    this.context = this.constant.single_sync;
    this.loadingText = 'Syncing'
    this.customizeNameForSave = "Single Sync";
    const popUp = this.popup.open(SuccessComponent, {
      data: {
        title: this.title, description: this.context, data: [], hideCancelButton: true, customizeNameForSave: this.customizeNameForSave,
        aggregatorData: null
      }, disableClose: true
    })
    popUp.afterClosed().subscribe((response) => {
      if (response) {
        this.ViewItemConfirm();
      }
    })
  }


  ViewItemConfirm(): void {
      this.loadingSpinner = true;
      this.service.syncData(['1']).subscribe({
        next: (data: MenuData) => {
          this.handleViewItemResponse(data);
        },
        error: (error: SyncMenuErrorBody) => {
          this.handleViewItemError(error);
        }
      });
  }

  handleViewItemResponse(data: MenuData):void{
    this.loadingSpinner = false;
    this.popup.open(SuccessComponent, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        title: 'Select Aggregator', description: this.context, completeJson: data.data, hideCancelButton: true, customizeNameForSave: 'Sync',
        aggregatorData: null
      }, disableClose: true
    })
  }
  
  handleViewItemError(error: SyncMenuErrorBody):void{
    this.isErrorOccur = true;
    this.errorMessage = error.message
    this.loadingSpinner = false
  }

    // when user copy any of text from fields
    onClipboardCopy(successful: boolean): void {
      if (successful) {
        this.toaster.success('Copied to Clipboard', 'Successfully', {
          positionClass: 'toast-bottom-right',
          progressBar: true,
          timeOut:2500
        });
      }
    }
  setCopyError(): void {
    let errorMessage = '';
    this.rows.forEach((item,index:number)=>{
      item['id'] = index+1
      item['ErrorJson'] = JSON.parse(item.Error as string) as ErrorJson[]
    })
    this.rows.forEach(item => {
      errorMessage = '';
      item['ErrorJson']?.forEach((error: ErrorJson,index:number) => {
        // let parseError = JSON.parse(error.Error)
        if(index === 0){
          errorMessage = error['message'];
        }else{
          errorMessage =  errorMessage.concat(' , '+ error['message'])
        }
      })
      if (errorMessage.length) {
        item['StringifyError'] = errorMessage;
      }
    })
  }
}

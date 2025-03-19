import { Component, ViewChild, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonResponseJson, SyncCustomError, FetchDataJson, FilterDropDataInterface, FilterDropDataValues, MenuRows, 
          SyncMenuFilterData, GetViewMenu, MenuData, SyncTrackResponse, ViewMenu, LoadingTable,
          DeleteResponse,
          RemoveOutletRequest} from '../interface/sync-menu-interface';
import { AppLoggerModule } from '../../../../Core/logger.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModelComponent } from '../../../../Shared/popup/model/model.component';
import { Subject, } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from '../../../../Shared/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { SuccessComponent } from '../../../../Shared/popup/success/success.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router'; 
import { AggregatorList } from '../../../../Shared/const/common.constant';
import { MatSortModule, Sort} from '@angular/material/sort';
import { FilterComponent } from '../../../../Shared/filter/filter.component';
import { StatusColorPipe } from '../../../../Shared/pipes/status-color.pipe';
import GlobalInterceptor from '../../../../Core/interceptors/global.interceptor';
import { InlineErrorMsgComponent } from "../../../../Shared/inline-error-msg/inline-error-msg.component";
import { ToastrService as ToasterService } from 'ngx-toastr';
import { SYNC_MENU_SERVICE_TOKEN } from '../../sync-menu.module';
import { IApplyFilter, IFetchFromERP, IGetDataOutLet, IGetMenuData, IGetSyncData, IGetSyncTrack, IPublishRecord, IVerifyRecords } from '../service/sync-menu-service-interface';
import { SyncMenuConstant } from '../const/sync-menu.const';
import { SyncMenuJsonMaker, SyncMenuLogic } from './sync-menu-logic.service';
import { ViewMenuComponent } from '../view-menu/view-menu.component';
import { SyncTrackComponent } from '../../sync-track/sync-track.component';
import { DateFormatPipe } from '../../../../Shared/pipes/date-format.pipe';
import { CustomError } from '../../../authentication/interface/login-interface';
import { CreateOutletsComponent } from '../../create-outlets/create-outlets.component';
import { CreateOutletService } from '../../create-outlets/create-outlet.service';

 
@Component({
  selector: 'app-sync-menu',
  standalone: true,
  imports: [AppLoggerModule, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, LoaderComponent, FormsModule, MatSortModule, FilterComponent, DateFormatPipe,
    StatusColorPipe, InlineErrorMsgComponent],
  templateUrl: './sync-menu.component.html',
  styleUrl: './sync-menu.component.scss',
  providers : [HttpClientModule,ToasterService,CreateOutletService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true, // This allows multiple interceptors
    },
  ]
})

export class SyncMenuComponent implements OnInit, OnDestroy {
  jsonData:[]  =[];
  tableData:[]=[];
  
  constructor(  @Inject(SYNC_MENU_SERVICE_TOKEN) private readonly service :  IGetDataOutLet & IGetSyncData & IGetMenuData & IPublishRecord & IFetchFromERP & IVerifyRecords & IGetSyncTrack & IApplyFilter,
      readonly popup: MatDialog , readonly router : Router,readonly toaster: ToasterService,readonly syncService:CreateOutletService){
        this.columns = this.constant.columnData
        const storedAggregators = localStorage.getItem('aggregatorList');
        if(storedAggregators){
          this.aggregatorList = JSON.parse(storedAggregators) as AggregatorList[]
          this.aggregatorList = this.aggregatorList.map(item => ({ ...item , isChecked: false }));
        }
      }
  constant = SyncMenuConstant
  @ViewChild('appModel') appModel! : ModelComponent
  page : number = 1;
  itemPerPage : number = 10;
  numberOfSkeletonForDataTable: any[] = Array(7).fill(0)
  numberOfSkeletonForMenuModel: any[] = Array(11).fill(0)
  previousSortDirection : string = ''

  loading : boolean = false;
  loadingMenuModel : boolean = false;
  loadingSpinner : boolean = false
  loadingText : string = this.constant.Loading
  aggregatorList : AggregatorList[] = []
  rows : MenuRows[] = []
  columns : string[];
  allData : MenuRows[] = []
  filteredRows : MenuRows[] = []
  selectedRows :  MenuRows[] = []
  
  title: string = '';
  context: string = '';
  dropDownSelectedValue : string = this.constant.ten;
  customizeNameForSave : string = this.constant.Sync
  errorMsg:string = '';
  isErrorOccur:boolean = false;
  isAllSelected : boolean = false;
  currentRowData! : MenuRows;
  
  menuContainer!:HTMLElement | null ;
  unsubscribe$ = new Subject<void>();
  menuContent!: HTMLCollectionOf<HTMLElement> ;
  
  syncMenuFilterData! : SyncMenuFilterData
  syncMenuDataLists!:SyncMenuFilterData
  FilterDropDataInterface!:FilterDropDataInterface

  lastSyncedColumnError = ['SYNCED' , 'NOT SYNCED YET']
  staticNumber : number = 0
  formattedDate!: string;
  formattedTime!:string;


  startSyncingTime! : number;
  endSyncingTime! : number;
  elapsedTime! : number ;
  loadingTable:LoadingTable = { view: [], sync: [], trackProgress: [] };
  last_synced!:string;


  ngOnInit() : void{
    this.setPage(); // Fetch data
  }


  ngOnDestroy() : void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
 
 
  // Below function is Use for get and set Records
  setPage(): void {
    this.service.getOutLetData().subscribe({
      next: (response: CommonResponseJson) => {
        if (response.statusCode == 200) {
          this.handleSetPageResponse(response)
        }
        this.loading = true;
      },
      error: (error: SyncCustomError) => {
        this.handleSetPageError(error);
      },
      complete: () => {
      }
    });
  }

  handleSetPageResponse(response: CommonResponseJson): void {
    this.rows = response.data as MenuRows[];
    this.allData = response.data as MenuRows[];
    this.rows = this.rows.map(item => ({ ...item, isChecked: false, staticSyncedStatus: this.lastSyncedColumnError[this.getRandomValues(item)] }));
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    this.formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const options2: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    this.formattedTime = new Intl.DateTimeFormat('en-US', options2).format(date);
    this.rows.forEach((item: MenuRows) => {
      if (item && item.staticSyncedStatus === 'SYNCED') {
        item.staticSyncedStatus = this.formattedDate;
        item.staticTime = this.formattedTime
      }
    })
  }

  handleSetPageError(error: SyncCustomError): void {
    this.isErrorOccur = true;
    this.errorMsg = error.customMessage
    this.loading = true
  }

  getRandomValues(data:MenuRows):number{
    this.staticNumber = !data.Edited_Timestamp ? 1 : 0;
    return this.staticNumber;
  }
 
  openConfirmationPopup(index: number, row?: MenuRows | null, title?: string, from?: string, loadingText?: string): void {
    this.initializePopupState(from, title, loadingText, row);
    if (title) {
      this.openPopup(index);
    }
  }
  
  initializePopupState(from?: string, title?: string, loadingText?: string, row?: MenuRows | null): void {
    this.isErrorOccur = false;
    this.errorMsg = '';
  
    if (from === this.constant.verify) {
      this.title = this.constant.verify_tittle;
      this.context = this.constant.verify_context;
      this.customizeNameForSave = this.constant.Verify;
    } else {
      this.context = '';
      this.title = title || '';
    }
  
    this.loadingText = loadingText ?? this.constant.Syncing;
  
    if (row) {
      this.currentRowData = row;
    }
  }
  
  openPopup(index: number): void {
    this.openPopupInitialize();
    const popUp = this.popup.open(SuccessComponent, {
      data: {
        title: this.title, description: this.context, data: [],
        hideCancelButton: true, customizeNameForSave: this.customizeNameForSave, aggregatorData: null,
      },
      disableClose: true,
    });
    this.handlePopupClosure(popUp, index);
  }
  
  openPopupInitialize(): void {
    this.title = this.constant.confirmation;
    this.context = this.constant.single_sync;
    this.loadingText = 'Syncing';
    this.customizeNameForSave = "Single Sync";
  }
  
   handlePopupClosure(popUp: MatDialogRef<SuccessComponent>, index: number): void {
    popUp.afterClosed().subscribe((response) => {
      if (response) {
        this.syncingData(index);
      }
    });
  }

  // below function is use to get menu list for particular restaurant
  getMenuList(currentRow: MenuRows,index:number): void {
    this.initializeMenuList(index);
    if (currentRow) {
      this.service.getMenu(1, 10, currentRow?.brcode).subscribe({
        next: (response: GetViewMenu) => {
         this.handleMenuListResponse(response,index);
        },
        error: (error: SyncCustomError) => {
          this.handleMenuListError(error,index);
        },
        complete: () => {
          this.handleMenuListCompletion(index);
        }
      });
    }
  }

  initializeMenuList(index: number): void {
    this.loadingMenuModel = false;
    this.loadingSpinner = true;
    this.isErrorOccur = false;
    this.loadingTable.view[index] = true;
  }

  handleMenuListResponse(response: GetViewMenu, index: number): void {
    if (response.statusCode == 200) {
      this.initializeMenuListResp(index);
      const menuData: ViewMenu[] = this.setSrNo(response.data);
      this.popup.open(ViewMenuComponent, { data: { data: menuData, totalCount: response.totalCount, title: 'Restaurant Menu', } });
    }
  }

  initializeMenuListResp(index:number): void {
    this.loadingSpinner = false;
    this.loadingTable.view[index] = false;
  }

  handleMenuListError(error: SyncCustomError, index: number): void {
    this.isErrorOccur = true;
    this.loadingSpinner = false;
    this.loadingTable.view[index] = false;
    this.errorMsg = error.customMessage
  }

  handleMenuListCompletion(index: number): void {
    this.isErrorOccur = false;
    this.loadingTable.view[index] = false;
    this.loadingMenuModel = true;
    this.loadingSpinner = false;
    setTimeout(() => {
      this.customWidth();
    }, 100);
  }

  setSrNo(menuData: ViewMenu[]): ViewMenu[] {
    return menuData.map((item: ViewMenu, index: number) => {
      item['srNo'] = index+1;
      return item;
    });
  }

  // basic common popup use for conformation go further or stop
  commonPermissionPopUp(event : {'title' : string , 'context' : string , 'loadingText' : string}):void{
    this.initializationCommonPermissionPopUp(event);
    this.closeInlineError();
    const popUp = this.popup.open(SuccessComponent , {
      data : {title : this.title , description : this.context , data : [] , hideCancelButton : true , customizeNameForSave : this.customizeNameForSave , 
      aggregatorData : null},disableClose: true
    })
    popUp.afterClosed().subscribe((response)=>{
      if(response){
        this.publishAndPullLatestFromERP(event.loadingText)
        this.unSelectAll()
      }
    })
  }

  initializationCommonPermissionPopUp(event: { 'title': string, 'context': string, 'loadingText': string }): void {
    this.title = event.title || ''
    this.context = event.context || ''
    this.loadingText = event.loadingText || '';
    this.customizeNameForSave = event.loadingText == this.constant.SyncAll ? this.constant.SyncAll : this.constant.Pull_Data;
  }
 
  // when click on sync data it will syncing data
  syncingData(index: number): void {
    if (this.currentRowData) {
      this.initializationSyncData(index);
      this.startTimer()
      this.gettingSyncingData(index)
    }
  }

  gettingSyncingData(index: number): void {
    this.service.syncData([this.currentRowData?.brcode]).subscribe({
      next: (data: MenuData) => {
        this.handleSyncingDataResponse(data, index);

      },
      error: (error: SyncCustomError) => {
        this.handleSyncingDataError(error, index)
      }
    });
  }

  initializationSyncData(index: number): void {
    this.loadingSpinner = true;
    this.isErrorOccur = false;
    this.loadingTable.sync[index] = true;
  }

  handleSyncingDataResponse(data: MenuData, index: number): void {
    this.initializeSyncingResp(index);
    this.openToast(data);
    this.stopTimer()
    this.successComponent(data);
  }

  initializeSyncingResp(index: number): void {
    this.loadingSpinner = false;
    this.loadingTable.sync[index] = false;
  }
  openToast(data: MenuData): void {
    this.toaster.success('', data.message, {
      timeOut: 3500,
      progressBar: true,
      positionClass: this.constant.toast_top_center
    })
  }

  successComponent(data: MenuData): void {
    const popup = this.popup.open(SuccessComponent, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        title: 'Select Aggregator', description: this.context, completeJson: data.data, hideCancelButton: true, customizeNameForSave: 'Sync',
        aggregatorData: null, syncTiming: this.elapsedTime
      }, disableClose: true
    })
    popup.afterClosed().subscribe(() => {
      this.loading = false;
      this.setPage();
    })
  }

  handleSyncingDataError(error: SyncCustomError, index: number): void {
    this.resetTimer()
    console.error(this.constant.fetchingError, error);
   this.assignError(error,index);
  }

  assignError(error: SyncCustomError, index: number):void{
    if (error && error.message == this.constant.Syncing_error_Msg) {
      void this.router.navigateByUrl(this.constant.Sync_Menu_Error_Url)
    } else {
      this.isErrorOccur = true;
      this.errorMsg = error.customMessage
    }
    this.aggregatorList.forEach(item => item.isChecked = false)
    this.loadingSpinner = false;
    this.loadingTable.sync[index] = false;
  }

  // Below function is use to set new page after page change
  RecordPerPage() : void{
    this.page = 1;
    if (this.dropDownSelectedValue != this.itemPerPage?.toString()) {
      if(this.dropDownSelectedValue == this.constant.All){
        this.itemPerPage = this.rows.length
      }else{
        this.itemPerPage = parseInt(this.dropDownSelectedValue)
      }
    } 
  }

  // Below function is use to assign same width to all images show in menu screen
  customWidth() : void {
    this.menuContainer = document.getElementById('menu-card');
    this.menuContent = document.getElementsByClassName('menu-item-detail') as HTMLCollectionOf<HTMLElement>;
      if (this.menuContent && this.menuContainer?.getBoundingClientRect()) {
        const dataArray = Array.from(this.menuContent);
        dataArray.forEach((element:HTMLElement | null ) => {
          if(element?.style){
            element.style.width = this.menuContainer?(this.menuContainer.getBoundingClientRect().width - 275) + "px":'';   
          }
        })
    }
  }

  // below function is use to sorting based on columns
  sortData(sort : Sort) : void{
    const {rows, previousSortDirection} =  SyncMenuLogic.sortData(sort, this.rows, this.previousSortDirection)
    this.rows = rows;
    this.previousSortDirection = previousSortDirection;
  }



  // filter code 
  filter(value:string):void{
    if (value.trim() !== '') {
      const searchTerm = value.toLowerCase();
      this.filteredRows = this.allData.filter(restaurant =>
        Object.values(restaurant).some(cellValue => 
          cellValue != null && 
          (typeof cellValue === 'string' || typeof cellValue === 'number') && 
          cellValue.toString().toLowerCase().includes(searchTerm)
        )
      );
      this.rows = this.filteredRows;
    }else{
      this.rows = this.allData
    }
  }

  // When click on close icon on inline error message
  closeInlineError():void{
    this.isErrorOccur = false;
    this.errorMsg = ''
  }


  //make all unselect
  unSelectAll():void{
    this.rows.forEach(item => (item.isChecked = false));
    this.selectedRows = []
    this.isAllSelected = false;
  }

  selectRow(event: Event, action?: string, row?: MenuRows): void {
    if (!event || !this.allData || this.rows.length === 0) {
      return;
    }
  
    const isChecked = this.getCheckboxState(event);
  
    if (action === this.constant.All && !row) {
      this.handleSelectAll(isChecked);
    } else if (row) {
      this.handleSingleSelection(row, isChecked);
    }
  }
  
  getCheckboxState(event: Event): boolean {
    const inputElement = event.target as HTMLInputElement;
    return inputElement.checked;
  }
  
  
  private handleSelectAll(isChecked: boolean): void {
    this.rows.forEach(item => {
      // if (item['staticSyncedStatus'] !== 'IN PROGRESS') {
        item.isChecked = isChecked
      // }
    }
    );
    this.selectedRows = isChecked ? [...this.allData] : [];
    this.isAllSelected = isChecked;
  }
  
  private handleSingleSelection(row: MenuRows, isChecked: boolean): void {
    const {selectedRows,isAllSelected , rows} = SyncMenuLogic.handleSingleSelection(this.isAllSelected, this.selectedRows, this.rows,this.allData,row, isChecked)
    this.selectedRows = selectedRows;
    this.isAllSelected = isAllSelected;
    this.rows = rows;
  }
  
  // for publishing data and pull data from ERP
  publishAndPullLatestFromERP(subject: string): void {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const GroupOfId = SyncMenuJsonMaker.makeGroupOfId(this.selectedRows);

      if (subject == this.constant.Publishing && GroupOfId) {
        this.publishData(GroupOfId);
      } else if (subject === this.constant.Fetching_Data && GroupOfId) {
        this.fetchData(GroupOfId);
      } else if (subject === this.constant.verify && GroupOfId) {
        this.verifyData(GroupOfId);
      } else if (subject == this.constant.SyncAll && GroupOfId) {
        this.syncAllData(GroupOfId)
      }
    }
  }

  publishData(GroupOfId: FetchDataJson[]): void {
    this.initializePublicData();
    // const index = this.rows.findIndex(item => item.id === GroupOfId[0])
    const rowsId:string [] = []; 
    GroupOfId.forEach(element => {
      if(element.ShopCode){
        rowsId.push(element.ShopCode)
      }
    });
    this.service.syncData(rowsId).subscribe({
      next: () => {
      this.publishDataRes();
      },
      error: (error: SyncCustomError) => {
        this.publishDataError(error);
      }
    })
  }

  initializePublicData(): void {
    this.loadingSpinner = true;
    this.loadingText = this.constant.Publishing
  }

  publishDataRes(): void {
    this.loadingSpinner = false;
    this.toaster.success('', this.constant.Data_Published, {
      timeOut: 3500,
      progressBar: true,
      positionClass: this.constant.toast_top_center
    })
  }

  publishDataError(error: SyncCustomError): void {
    this.loadingSpinner = false;
    this.isErrorOccur = false;
    this.errorMsg = error.customMessage
  }

  fetchData(GroupOfId: FetchDataJson[]): void {
    this.initializeFetchData();
    this.service.fetchFromERP(GroupOfId).subscribe({
      next: () => {
        this.fetchDataResp();
      },
      error: (error: SyncCustomError) => {
      this.fetchDataError(error);
      }
    })
  }

  initializeFetchData():void{
    this.loadingSpinner = true;
    this.loadingText = this.constant.Fetching_Data
  }

  fetchDataResp(): void {
    this.initFetchDataResp();
    this.openFetchToast();
  }

  initFetchDataResp(): void {
    this.loadingSpinner = false;
    this.isErrorOccur = false;
  }

  openFetchToast(): void {
    this.toaster.success('', this.constant.Data_Fetched, {
      timeOut: 3500,
      progressBar: true,
      positionClass: this.constant.toast_top_center
    })
  }

  fetchDataError(error: SyncCustomError): void {
    this.isErrorOccur = true;
    this.loadingSpinner = false;
    this.errorMsg = error.customMessage
  }

  verifyData(GroupOfId: FetchDataJson[]): void {
    this.initVerifyData();
    this.service.verifyRecords(GroupOfId).subscribe({
      next: () => {
        this.verifyDataRes();
      },
      error: (error: SyncCustomError) => {
        this.fetchDataError(error);
      }
    })
  }

  initVerifyData():void{
    this.loadingSpinner = true;
    this.loadingText = this.constant.verifying
  }

  verifyDataRes():void{
   this.initVerifyDataRes();
   this.toastVerifyDataRes();
  }

  initVerifyDataRes():void{
    this.loadingSpinner = false;
    this.isErrorOccur = false;
  }

  toastVerifyDataRes(): void {
    this.toaster.success('', this.constant.Data_Verified, {
      timeOut: 3500,
      progressBar: true,
      positionClass: this.constant.toast_top_center
    })
  }

  syncAllData(GroupOfId: FetchDataJson[]): void {
    this.initSyncAllData();
    // const index = this.rows.findIndex(item => item.brcode === GroupOfId[0].ShopCode)
    this.startTimer()
    const rowsId:string [] = []; 
    GroupOfId.forEach(element => {
      if(element.ShopCode){
        rowsId.push(element.ShopCode)
      }
    });
    this.service.syncData(rowsId).subscribe({
      next: (data:MenuData) => {
        this.syncAllDataRes(data);
      },
      error: (error: SyncCustomError) => {
        this.syncAllDataError(error);
      }
    })
  }

  initSyncAllData():void{
    this.loadingSpinner = true;
    this.loadingText = this.constant.SyncAll
  }

  syncAllDataRes(data: MenuData): void {
    this.loadingSpinner = false;
    this.openToast(data);
    this.stopTimer()
    this.popupSyncAllDataRes(data);   
  }

  popupSyncAllDataRes(data: MenuData): void {
    const popup = this.popup.open(SuccessComponent, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        title: 'Select Aggregator', description: this.context, data: data, hideCancelButton: true, customizeNameForSave: 'Sync',
        aggregatorData: null, syncTiming: this.elapsedTime, completeJson: data.data
      }, disableClose: true
    })
    popup.afterClosed().subscribe(() => {
      this.loading = false;
      this.setPage();
    })
  }

  syncAllDataError(error: SyncCustomError): void {
    this.resetTimer();
    this.initSyncAllDataError(error);
  }

  initSyncAllDataError(error: SyncCustomError):void{
    this.loadingSpinner = false;
    this.isErrorOccur = true;
    this.errorMsg = error.customMessage
  }

  // when apply filter 
  // submit for location , region , city filter
  submitSyncMenuFilter(event : SyncMenuFilterData):void{
    if(event){
      this.closeInlineError();
      this.setFilterData(event)
      this.setPage()
    }
  }

  // submit for region , menu-caption , online partner filter
  submitFilter(event : FilterDropDataValues):void{
    this.service.applyFilter(event).subscribe({
      next: () => {
        console.log('filter -- applied')
      },
      error: (error: SyncCustomError) => {
        this.syncAllDataError(error);
      }
    })
  }

  // For lazy loading in sync menu
  // onScroll(event: Event) : void{
  //   const element = event.target as HTMLElement;
 
  //   if (element.scrollTop+ element.clientHeight + 10 >= element.scrollHeight) {
  //     this.loadNextChunk();
  //   }
  // }
 
  // loadNextChunk() : void {
  //   const currentLength = this.displayedCards.length;
  //   const nextChunk = this.menuCards.slice(
  //     currentLength,
  //     currentLength + this.chunkSize
  //   );
  //   this.displayedCards = [...this.displayedCards, ...nextChunk];
  //   this.listOfMenus = this.displayedCards;
  // }

  setFilterData(event:SyncMenuFilterData):void{
    const { modifiedEvent } = SyncMenuLogic.setFilterData(event, this.syncMenuDataLists);
    event = modifiedEvent;
    // }
  }
  resetFilter(event:SyncMenuFilterData):void{
    event;
    this.setPage()
  }



  // below function is start timer when user click on syncing button 
  startTimer():void {
    this.startSyncingTime = Date.now(); // Capture the current timestamp
    this.endSyncingTime = 0; // Reset the end time
    this.elapsedTime = 0; // Reset the elapsed time
  }

  // Stop Timer
  stopTimer():void {
  if (this.startSyncingTime) {
    this.endSyncingTime = Date.now(); // Capture the current timestamp
    this.elapsedTime = this.endSyncingTime - this.startSyncingTime; // Calculate elapsed time in milliseconds
    console.log('Timer stopped. Elapsed time: ', this.elapsedTime, 'ms');
  } else {
    console.warn('Timer has not been started yet!');
  }
}

 // Reset time 
 resetTimer():void{
  this.startSyncingTime = 0 ; 
  this.endSyncingTime = 0 ; 
  this.elapsedTime = 0;
 }

  syncTrack(currentRow:MenuRows, index:number): void {
    this.initializeSyncTrack(index);
    if (currentRow) {
      this.service.getSyncTrack(1, 10, currentRow?.brcode).subscribe({
        next: (response: SyncTrackResponse) => {
          this.syncTrackRes(response,currentRow,index);
        },
        error: (error: CustomError) => {
          this.syncTrackError(error,index);
        },
        complete: () => {
        this.syncTrackCompletion(index);
        }
      });
    }
  }

  initializeSyncTrack(index: number): void {
    this.isErrorOccur = false;
    this.loadingMenuModel = false;
    this.loadingSpinner = true;
    this.loadingTable.trackProgress[index] = true;
  }

  syncTrackRes(response: SyncTrackResponse, currentRow: MenuRows, index: number): void {
    if (response) {
      this.initSyncTrackRes(response,index)
      this.popupSyncTrackRes(response, currentRow);
    }
  }
  initSyncTrackRes(response: SyncTrackResponse, index: number):void{
    this.loadingSpinner = false;
    this.loadingTable.trackProgress[index] = false;
    this.last_synced = response.last_synced ? response.last_synced : 'Time not available';
  }
  popupSyncTrackRes(response: SyncTrackResponse, currentRow: MenuRows):void{
    const sortedData = SyncMenuLogic.extractFields(response.data)
    const popup = this.popup.open(SyncTrackComponent, { data: { data: sortedData, totalCount: 1, title: 'Restaurant Menu', restaurantName: currentRow.brname, last_synced: this.last_synced } });
      if(popup){
        popup.afterClosed().subscribe(() => {
          this.setPage()
        });
      }
  }

  syncTrackError(error: CustomError, index: number): void {
    this.isErrorOccur = true;
    this.loadingMenuModel = true;
    this.loadingSpinner = false;
    this.loadingTable.trackProgress[index] = false;
    this.errorMsg = error?.customMessage ? error.customMessage : ''
  }

  syncTrackCompletion(index: number): void {
    this.loadingMenuModel = true;
    this.loadingSpinner = false;
    this.loadingTable.trackProgress[index] = false;
    setTimeout(() => {
      this.customWidth();
    }, 100);
  }

  createOutlet():void{
    console.log('createOutlet')
    const popup = this.popup.open(CreateOutletsComponent, { data: {data:[], create:true, title: 'Create Outlet',  } });
    console.log('popup',popup);
    if(popup){
      popup.afterClosed().subscribe(() => {
        this.setPage()
      });
    }

  }
 
  deleteOutlet(item:MenuRows):void{
    console.log('item',item)
    const data :RemoveOutletRequest ={
      brcode:item.brcode
    }
    this.loadingSpinner = true;
    this.syncService.deleteOutlet(data).subscribe({
      next : (response:DeleteResponse) => {
        if(response['message'] == "Record deleted successfully."){
          console.log('response',response)
          this.loadingSpinner = false;
          this.setPage()
        }
      }, 
      error : (error : CustomError) => {
        this.isErrorOccur = true;
        this.loadingSpinner = false;
        this.errorMsg = error.error?.error as string 
        this.isErrorOccur = true;
      }
    })
  }

  updateOutlet(element:MenuRows):void{
    console.log('element',element)

    const popup = this.popup.open(CreateOutletsComponent, { data: {data:[element], create:false, title: 'Create Outlet',  } });
    console.log('popup',popup);
    if(popup){
      popup.afterClosed().subscribe(() => {
        this.setPage()
      });
    }
  }
  
}


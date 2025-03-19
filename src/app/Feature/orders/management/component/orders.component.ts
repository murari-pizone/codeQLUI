import {  Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AppLoggerModule } from '../../../../Core/logger.module';
import { NGXLogger } from 'ngx-logger';
import { DatesInformation, IDateWiseCount, OrderData, OrderGet, OrderItemDetails, OrderListData, OrderResponse, Page } from '../interface/ordersInterface';
import { orderConstant } from '../const/ordersConst';
import {  MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatSortModule, Sort} from '@angular/material/sort';
import { FilterComponent } from "../../../../Shared/filter/filter.component";
import { StatusColorPipe } from '../../../../Shared/pipes/status-color.pipe';
import { LoaderComponent } from '../../../../Shared/loader/loader.component';
import { OrderTrackDeliveryComponent } from '../../tracking/order-track-delivery/order-track-delivery.component';
import { CalenderBarComponent } from '../../../../Shared/calender-bar/calender-bar.component';
import { ToastrService as ToasterService } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import GlobalInterceptor from '../../../../Core/interceptors/global.interceptor';
import { InlineErrorMsgComponent } from "../../../../Shared/inline-error-msg/inline-error-msg.component";
import { DateFormatPipe } from "../../../../Shared/pipes/date-format.pipe";
import { ORDERS_TOKEN } from '../../orders.module';
import { IGetOrderData} from '../service/order-service.interface';
import { orderService } from '../service/order-service';
import { commonLogicService } from '../../../../Shared/commonLogic/common-Logic-service';
import { CloseError } from '../../../../Core/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomError } from '../../../authentication/interface/login-interface';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AppLoggerModule, MatTableModule, CommonModule, NgxPaginationModule, FormsModule, MatSortModule, FilterComponent, StatusColorPipe, LoaderComponent, OrderTrackDeliveryComponent, InlineErrorMsgComponent, DateFormatPipe, CalenderBarComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers : [orderConstant,StatusColorPipe,ToasterService
    // ,SocketHelpService
    ,DateFormatPipe,commonLogicService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true, // This allows multiple interceptors
    },
    { provide: ORDERS_TOKEN, useClass: orderService }
  ],
})

export class OrdersComponent implements OnInit {

  loadingSkeleton  : boolean  = false;
  loading = false;
  page = new Page();
  rows: OrderListData[] = [];
  orderItemDetails:OrderItemDetails[] = [];
  OrderDetails: OrderGet;
  columns : string[];
  numberOfSkeletonForDataTable: any[] = Array(7).fill(0)
  dropDownSelectedValue : string = '10';
  isPushButtonClicked : boolean = false;
  currentRow! : OrderData ;
  showMoreDetailsVar : boolean = false;

  dateWiseCount : IDateWiseCount[] = []
  DatesInformation : DatesInformation[] = []

  // Filter Related Variables
  @ViewChild('calenderBarComponent') calenderBarComponent!: CalenderBarComponent
  @ViewChild('ordersModal') menuModal!: ElementRef
  // @ViewChild(OrderTrackDeliveryComponent) orderTrack!: OrderTrackDeliveryComponent; 

  errorMsg:string = '';
  isErrorOccur:boolean = false;
  isModelOpen: boolean = false;
  currentDate : Date = new Date()
  status:string | null = 'All';
  orderText : string = '     All'
  elementData: OrderListData[]=[];


  constructor(private readonly logger : NGXLogger,private readonly constant : orderConstant , readonly toaster : ToasterService , @Inject(ORDERS_TOKEN) private orderService: IGetOrderData , public commonLogic : commonLogicService,
readonly popup: MatDialog){
    this.logger.info('started')
    this.columns = this.constant.columnData
    this.page.pageSize = 10;
    this.page.currentPage = 1;
    this.OrderDetails = { totalCancelled : 0, totalDelivered : 0, totalPending : 0, totalCount : 0, totalRecordCount :0 };
  }

  ngOnInit() :void{
    this.setPage(this.page.currentPage,this.page.pageSize,null,null,null);
  }

  private setPage(PageNumber: number, itemPerPage: number, date: Date | null, status: string | null, search: string | null): void {
    this.showLoading();
    const dateInRequiredFormat = this.formatDate(date);
  
    this.orderService.getOrderData(PageNumber, itemPerPage, dateInRequiredFormat, status, search).subscribe({
      next: (response: OrderResponse) => this.handleResponse(response),
      error: (error: CustomError) => this.handleError(error),
    });
  }
  
  private showLoading(): void {
    this.loadingSkeleton = true;
    this.loading = true;
  }
  
  private formatDate(date: Date | null): string | null {
    return date ? this.commonLogic.convertDate(date) : null;
  }
  
  private handleResponse(response: OrderResponse): void {
    this.updateLoadingState(false);
  
    if (this.isResponseSuccessful(response)) {
      this.processResponseData(response);
    }
  }
  
  private updateLoadingState(isLoading: boolean): void {
    this.loadingSkeleton = isLoading;
    this.loading = isLoading;
  }
  
  private isResponseSuccessful(response: OrderResponse): boolean {
    return response.success === 'Ok';
  }
  
  private processResponseData(response: OrderResponse): void {
    this.rows = response['data'] as OrderListData[];
    this.setOrderDetails(response);
    this.setDatesInformation();
  }
  

  // when date change in calender 
  DateChange(newSelectedData : Date):void{
    if(newSelectedData){
      this.currentDate = newSelectedData
      this.setPage(this.page.currentPage,this.page.pageSize,this.currentDate,null,null);
    }
  }

  // Below function is Use for get and set initial order details
  setOrderDetails(response: OrderResponse): void {
    this.page.totalItems = response.totalCount ?? 0;
    const { totalCancelled = 0, totalDelivered = 0, totalPending = 0, totalCount = 0, totalRecordCount = 0 } = response;
    this.OrderDetails =  { totalCancelled, totalDelivered, totalPending, totalCount, totalRecordCount };
  }

  setDatesInformation():void {
    try {
      this.DatesInformation =  this.commonLogic.transformData(this.constant.dateWiseCount);
    } catch (error) {
      this.logger.error('Error mapping Dates Information:', error);
    }
  }

  // Handle error 
  handleError(error: CustomError): void {
    this.updateErrorState();
    this.setErrorMessage(error);
    this.logError();
  }
  
  private updateErrorState(): void {
    this.isErrorOccur = true;
    this.loadingSkeleton = false;
    this.loading = false;
  }
  
  private setErrorMessage(error: CustomError): void {
    this.errorMsg = error['customMessage'] || error.error?.error || 'An unexpected error occurred.';
  }
  
  private logError(): void {
    this.logger.error('Error occurred:', this.errorMsg);
  }


  // Below function is use to set new page after page change
  RecordPerPage(): void {
    this.updatePageSize();
    this.refreshPage();
  }
  
  private updatePageSize(): void {
    if (this.dropDownSelectedValue && this.dropDownSelectedValue !== this.page.currentPage.toString() && this.dropDownSelectedValue !== 'All') {
      this.page.pageSize = parseInt(this.dropDownSelectedValue);
    } else if (this.dropDownSelectedValue === 'All') {
      this.page.pageSize = this.page.totalItems;
    }
  }
  
  private refreshPage(): void {
    this.setPage(this.page.currentPage, this.page.pageSize, null, null, null);
  }

  // below method use for server side sorting
  sortData(sort : Sort):void{
    console.log(sort)
  }

  // below function is use to serer side pagination
  changePage(pageNumber:number):void{
    if (pageNumber && this.page.totalItems > 0) {
      this.page.currentPage = pageNumber
      this.refreshPage()
    }
  }

  //below function is use to filter data 
  filter(value:string):void{
    this.setPage(this.page.currentPage,this.page.pageSize,this.currentDate,null,value);
  }


  // below function is use to open model on double click of Row
  onRowDoubleClick(row : OrderData):void{
    console.log(row)
  }

  // Open Model
  openModel():void{
    if(this.menuModal){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const modalElement = new window.bootstrap.Modal(this.menuModal.nativeElement);
      modalElement.show();
    }
  }

  // Method to open the modal
  openOrderTrackModal(elementData:OrderListData[]): void {
    this.elementData = elementData;
    this.popup.open(OrderTrackDeliveryComponent, { data: { data: [elementData],  title: 'Restaurant Menu', },maxWidth: '60vw',
      width: '90%'  });
  }

  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = this.buildErrorState();
    this.processErrorState(errorState);
  }
  
  private buildErrorState(): { errorMessages: string; isErrorOccur: boolean;  } {
    return { errorMessages: this.errorMsg, isErrorOccur: this.isErrorOccur };
  }
  
  private processErrorState(errorState: { errorMessages: string; isErrorOccur: boolean;  }): void {
    CloseError.closeInlineError(errorState);
    this.syncErrorState(errorState);
  }
  
  private syncErrorState(errorState: { errorMessages: string; isErrorOccur: boolean;  }): void {
    this.errorMsg = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
  }
  


  empty():void{
    console.log('')
  }

  pendingStatus():void{
    this.status = 'ORDER_RECEIVED'
    this.setPage(this.page.currentPage,this.page.pageSize,null,this.status,null)
  }

  completedStatus():void{
    this.status = 'DELIVERED'
    this.setPage(this.page.currentPage,this.page.pageSize,null,this.status,null)
  }
  canceledStatus():void{
    this.status = 'CANCELLED'
    this.setPage(this.page.currentPage,this.page.pageSize,null,this.status,null)
  }
  allStatus():void{
    this.status = 'All';
    this.setPage(this.page.currentPage,this.page.pageSize,null,null,null)
  }
  refreshOrders():void{
    this.loading = true;
    this.setPage(this.page.currentPage,this.page.pageSize,null,null,null)
  }

}

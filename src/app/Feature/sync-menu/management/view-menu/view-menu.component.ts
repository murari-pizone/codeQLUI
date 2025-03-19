import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SyncMenuConstant } from '../const/sync-menu.const';
import {  AddMenuItemDetails, DeleteResponse, GetViewMenu, PageView, RemoveMenuItemRequest, ViewMenu } from '../interface/sync-menu-interface';
import { SyncMenuService } from '../service/sync-menu-service';
import { LoaderComponent } from '../../../../Shared/loader/loader.component';
import { InlineErrorMsgComponent } from '../../../../Shared/inline-error-msg/inline-error-msg.component';
import { CloseError } from '../../../../Core/services/common.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CustomError } from '../../../authentication/interface/login-interface';
import { AddMenuItemComponent } from '../add-menu-item/add-menu-item.component';
import { CreateOutletService } from '../../create-outlets/create-outlet.service';


@Component({
  selector: 'app-view-menu',
  standalone: true,
  imports: [
    FormsModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, MatSortModule, MatDialogModule, MatButtonModule, CommonModule, LoaderComponent, InlineErrorMsgComponent
  ],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.scss',
  providers: [
  ]
})
export class ViewMenuComponent implements OnInit {
  readonly filterData: Subject<string> = new Subject<string>();
  menuSearchValue:string = '';
  columns: string[];
  contactData: any;

  allMenuData: ViewMenu[] = [];
  rows: ViewMenu[] = []
  filterRows : ViewMenu[] = []
  totalCount : number = 0

  enableSyncButton: boolean = false
  constant = SyncMenuConstant;
  pageSelectedValue: string = '10';
  page = new  PageView()
  loading: boolean = false;
  loadingText: string = 'Loading View Menu'
  isErrorOccur: boolean = false;
  errorMsg: string = '';
  title: string = '';
  constructor(public dialogRef: MatDialogRef<ViewMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: GetViewMenu, private readonly service: SyncMenuService, readonly popup: MatDialog,readonly syncService:CreateOutletService) {
    this.columns = this.constant.viewMenuColumn
    this.contactData = {};
    if (data && typeof data['data']) {
      this.allMenuData = data['data'];
      this.title = data.title;
      this.rows = this.allMenuData;
      this.page.totalCount = data.totalCount
      this.totalCount = data.totalCount
    }
  }

  ngOnInit():void{
    this.filterData.pipe(debounceTime(600),distinctUntilChanged()).subscribe(value => {this.filterMenu(value)});
  }
  close(): void {
    this.dialogRef.close(true);
  }

  // when click on cross icons
  closeDialog(): void {
    this.dialogRef.close(false)
  }

  // empty 
  empty(): void {
    console.log('empty')
  }

  // get counted record on a page
  RecordPerPage(): void {
    this.page.pageNumber = 1;
    this.getMenuList()
  }

  // apply sorting on column name
  sortData(sort: Sort): void {
    console.log('sort', sort)
  }

  // below function is use to get menu list for particular restaurant
  getMenuList(search? : string | null): void {
    if (this.allMenuData.length) {
      this.loading = true
      this.isErrorOccur = false;
      const brCode = this.allMenuData[0].Brcode.toString();
      this.service.getMenu(this.page.pageNumber, Number(this.pageSelectedValue), brCode,search).subscribe({
        next: (response: GetViewMenu) => {
          if (response.statusCode == 200) {
            if(response.data){
              this.setMenuListData(response);
            }
          }
        },
        error: (error: CustomError) => {
          this.loading = false
          this.isErrorOccur = true;
          this.errorMsg = error.customMessage ? error.customMessage : error.error?.error as string;
        }
      });
    }
  }

  setMenuListData(response: GetViewMenu): void {
    this.loading = false;
    this.allMenuData = response.data;
    this.allMenuData.forEach((item: ViewMenu, index: number) => {
      item['srNo'] = index
    })
    this.rows = this.allMenuData
    this.page.itemPerPage = response.pageLimit;
    this.page.totalCount = response.totalCount;
    this.totalCount = response.totalCount;
  }

  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMsg, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMsg = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
  }

  // get data when page number change
  pageChange(event: number): void {
    this.page.pageNumber = event;
    this.getMenuList();
  }

  onChangeInput(value:string):void{
    this.filterData.next(value);
  }
  // for filtering menus 
  filterMenu(value:string):void{
    if(value){
       this.getMenuList(value)
    }
  }

  openOutlet():void{
    console.log('popup Called')
    
        const popup = this.popup.open(AddMenuItemComponent, { data: {data:[], create:true, title: 'Create Menu Item',  } });
        console.log('popup',popup);
        if(popup){
          popup.afterClosed().subscribe(() => {
            this.getMenuList()
          });
        }
  }

  deleteMenuItem(item:ViewMenu):void{
    console.log('item',item)
    const data :RemoveMenuItemRequest ={
      Icode:item.Icode.toString()
    }
    this.loading = true;
    this.syncService.deleteMenuItem(data).subscribe({
      next : (response:DeleteResponse) => {
        if(response['message'] == "Record deleted successfully." || response['message'] == "Item deleted successfully."){
          console.log('response',response)
          this.loading = false;
          this.getMenuList()
        }
      }, 
      error : (error : CustomError) => {
        this.isErrorOccur = true;
        this.loading = false;
        this.errorMsg = error.error?.error as string 
        this.isErrorOccur = true;
      }
    })
  }
  updateMenuItem(item:ViewMenu):void{
    console.log('item-item',item)
    console.log('element',item)
     const updatedJson:AddMenuItemDetails = this.makeUpdateJson(item);
    
        const popup = this.popup.open(AddMenuItemComponent, { data: {data:[updatedJson], create:false, title: 'Create Outlet',  } });
        console.log('popup',popup);
        if(popup){
          popup.afterClosed().subscribe(() => {
            this.getMenuList()
          });
        }
  }

  makeUpdateJson(item: ViewMenu): AddMenuItemDetails {
    const updatedJson: AddMenuItemDetails = {
      Region: '',
      ExtPlatform: item.ExtPlatform,
      ExtSubcatId: item.MainCategoryId,
      ExtSubcat: item.MainCategoryName,
      CatSort_order: item.CategorySortOrder,
      CatId: item.CategoryId,
      ExtCat: item.CategoryName,
      Cat: '',
      OptnGrpId: '',
      Icode: item.Icode,
      Iname: item.Iname,
      WebIname: '',
      frmtime: '', // ISO date format
      totime: '',  // ISO date format
      popitemYN: '',
      optionSaleYN: '',
      LiveStatus: item.LiveStatus,
      Uom: item.Uom,
      included_platforms: '', // Comma-separated platforms
      WebItmDescription: item.WebItmDescription,
      Recommended: item.Recommended,
      OptionGroupName: item.OptionGroupName
    };

    return updatedJson;
  }
}

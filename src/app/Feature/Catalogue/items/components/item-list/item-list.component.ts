import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ItemsService } from '../../service/Item-list/items-service';
import { InlineErrorMsgComponent } from "../../../../../Shared/inline-error-msg/inline-error-msg.component";
import { AppLoggerModule } from '../../../../../Core/logger.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from '../../../../../Shared/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ItemsFilterModalComponent } from "../items-filter-modal/items-filter-modal.component";
import { ItemModalComponent } from ".././item-modal/item-modal.component";
import { IGetAllItems } from '../../service/Item-list/item-service.interface';
import { ITEM_LIST_TOKEN } from '../../../catalogue.module';
import { CloseError } from '../../../../../Core/services/common.service';
import { FilterComponent } from "../../../../../Shared/filter/filter.component";
import { itemsConstant } from '../../const/items.constant';
import { CreateItemsRowData, ItemsRowData } from '../../interface/items.interface';
import * as bootstrap from 'bootstrap'
@Component({
  selector: 'app-items-component',
  standalone: true,
  imports: [InlineErrorMsgComponent, AppLoggerModule, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule,
    LoaderComponent, FormsModule, MatSortModule, MatButtonModule, MatMenuModule, ItemsFilterModalComponent, ItemModalComponent, FilterComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
  providers : [ItemsService,itemsConstant]
})
export class ItemListComponent implements OnInit {
  @ViewChild(ItemModalComponent) itemModalComponent!: ItemModalComponent;
  columns : string[] = []
  rows : ItemsRowData[] = []
  currentRow! : ItemsRowData
  errorMsg : string = ''
  isErrorOccur : boolean = false;
  loading : boolean = false;
  showSideBar : boolean = false;
  isCreateItem:boolean = false;
  // Static value for drop downs
  numberOfSkeletonForDataTable: any[] = Array(8).fill(0)
  // related to pagination
  itemPerPage : number = 15;
  page : number = 1;
  dropDownSelectedValue : string = '10';
  loadingSpinner : boolean = false

  constructor(public constant : itemsConstant , @Inject (ITEM_LIST_TOKEN) private readonly service : IGetAllItems){
    this.columns = this.constant.columns
  }

  // life cycle hook of angular 
  ngOnInit(): void {
    this.setPage()
  }

  // fot getting initially data 
  setPage():void{
    this.loading = false;
    this.service.getAllItems().subscribe({
      next : (response : ItemsRowData[]) => {
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
  openEditSideBar(row?:ItemsRowData):void{
    if(row){
      this.isCreateItem = false;
      this.currentRow = row;
      console.log(this.currentRow)
      this.showSideBar = true;
      this.openItemOffcanvas()
    }
  }

  // close side modal
  closeSideBar():void{
    this.showSideBar = false;
  }

  // add item emit
  addItem():void{
    this.showSideBar = true;
    this.isCreateItem = true;
    this.currentRow = new CreateItemsRowData()
    this.openItemOffcanvas()
  }

  // getting the child offCampus
  openItemOffcanvas() :void{
    this.itemModalComponent.currentRow = this.currentRow;
      const editItemElement = this.itemModalComponent.getEditItemElement();
      if(editItemElement){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const offcanvas = new bootstrap.Offcanvas(editItemElement.nativeElement);
        offcanvas.show();
      }
  }

  SaveItem(newItem : ItemsRowData):void{
    if(newItem){
      const newItemObject = { ...newItem }
      this.rows.unshift(newItemObject)
    }
  }
}

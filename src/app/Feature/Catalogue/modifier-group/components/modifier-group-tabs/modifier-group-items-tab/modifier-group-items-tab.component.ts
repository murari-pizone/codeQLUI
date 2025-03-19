import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CloseError } from '../../../../../../Core/services/common.service';
import { MatSortModule, Sort } from '@angular/material/sort';
import { ModifierGroupConstant } from '../../../const/modifier-group.const';
import { MODIFIER_GROUP_TABS_SERVICE_TOKEN } from '../../../../catalogue.module';
import { InlineErrorMsgComponent } from '../../../../../../Shared/inline-error-msg/inline-error-msg.component';
import { AppLoggerModule } from '../../../../../../Core/logger.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import * as bootstrap from 'bootstrap'
import { itemsConstant } from '../../../../items/const/items.constant';
import { ItemModalComponent } from '../../../../items/components/item-modal/item-modal.component';
import { ItemsRowData } from '../../../../items/interface/items.interface';
import { IGetAllItemsTabRecords } from '../../../service/modifier-group-modal/modifier-group-tabs-interface-service';

@Component({
  selector: 'app-items-tab',
  standalone: true,
  imports: [InlineErrorMsgComponent, AppLoggerModule, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, FormsModule, InlineErrorMsgComponent, MatSortModule, MatButtonModule, MatMenuModule, ItemModalComponent],
  templateUrl: './modifier-group-items-tab.component.html',
  styleUrl: './modifier-group-items-tab.component.scss',
  providers : [ModifierGroupConstant,itemsConstant]
})
export class ModifierGroupItemsTabComponent implements OnInit {
  @ViewChild(ItemModalComponent) itemModalComponent!: ItemModalComponent;
  columns : string[] = []
  rows : ItemsRowData[] = []
  currentRow! : ItemsRowData
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

  constructor(public constant : ModifierGroupConstant , @Inject (MODIFIER_GROUP_TABS_SERVICE_TOKEN) private readonly service : IGetAllItemsTabRecords){
      this.columns = this.constant.columnsForItemsTable
    }

  // life cycle hook of angular 
    ngOnInit(): void {
      this.setPage()
    }
  
    // fot getting initially data 
    setPage():void{
      this.loading = false;
      this.service.getAllItemTabRecords().subscribe({
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

  
  // close side modal
  closeSideBar():void{
    this.showSideBar = false;
  }

  // getting the child offCampus
  openOffcanvas(id: string , row:ItemsRowData) :void{id
    this.currentRow = row;
    this.showSideBar = true;
      const editItemElement = this.itemModalComponent.getEditItemElement();
      if(editItemElement){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const offcanvas = new bootstrap.Offcanvas(editItemElement.nativeElement);
        offcanvas.show();
      }
  }
}

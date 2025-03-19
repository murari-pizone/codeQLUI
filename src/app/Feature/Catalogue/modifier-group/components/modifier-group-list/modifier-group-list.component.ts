import { Component, Inject, OnInit } from '@angular/core';
import { MODIFIER_GROUP_LIST_TOKEN } from '../../../catalogue.module';
import { modifierGroupRowData } from '../../interface/modifier-group.interface';
import { CloseError } from '../../../../../Core/services/common.service';
import { MatSortModule, Sort } from '@angular/material/sort';
import { ModifierGroupConstant } from '../../const/modifier-group.const';
import { InlineErrorMsgComponent } from "../../../../../Shared/inline-error-msg/inline-error-msg.component";
import { AppLoggerModule } from '../../../../../Core/logger.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from '../../../../../Shared/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterComponent } from "../../../../../Shared/filter/filter.component";
import { ModifierGroupModalComponent } from "../modifier-group-modal/modifier-group-modal.component";
import { ModifierGroupService } from '../../service/modifier-group-list/modifier-group-service';
import { IGetAllModifierGroupRecords } from '../../service/modifier-group-list/modifier-group-interface-service';

@Component({
  selector: 'app-modifier-group',
  standalone: true,
  imports: [InlineErrorMsgComponent, AppLoggerModule, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule,
    LoaderComponent, FormsModule, InlineErrorMsgComponent, MatSortModule, FilterComponent, ModifierGroupModalComponent],
  templateUrl: './modifier-group-list.component.html',
  styleUrl: './modifier-group-list.component.scss',
  providers: [ModifierGroupConstant , ModifierGroupService]
})
export class ModifierGroupListComponent implements OnInit {
  constructor(@Inject (MODIFIER_GROUP_LIST_TOKEN) private readonly service : IGetAllModifierGroupRecords , public constant : ModifierGroupConstant){
    this.columns = this.constant.columns
  }
  loading : boolean = false;

  rows : modifierGroupRowData[] = []
  columns : string[] = []
  currentRow! : modifierGroupRowData

  
  errorMsg : string = ''
  isErrorOccur : boolean = false;
  showSideBar : boolean = false;
  // Static value for drop downs
  numberOfSkeletonForDataTable: any[] = Array(8).fill(0)
  loadingSpinner : boolean = false
  page : number = 1;


  dropDownSelectedValue : string = '15';
  itemPerPage : number = 15;


// life cycle hook of angular 
  ngOnInit(): void {
    this.setPage()
  }

  // fot getting initially data 
  setPage():void{
    this.loading = false;
    this.service.getAllModifierGroupRecords().subscribe({
      next : (response : modifierGroupRowData[]) => {
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
  openEditSideBar(row?:modifierGroupRowData):void{
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

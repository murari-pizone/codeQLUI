import { Component, OnInit } from '@angular/core';
import { AppLoggerModule } from '../../../Core/logger.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from '../../../Shared/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { SuccessComponent } from '../../../Shared/popup/success/success.component';
import { InlineErrorMsgComponent } from '../../../Shared/inline-error-msg/inline-error-msg.component';
import { LocationConstant } from '../const/location.const';
import { LocationRows } from '../interface/location.interface';
import { LocationFilterComponent } from "../location-filter/location-filter.component";
import { LocationService } from '../location.service';
import { MatSortModule, Sort } from '@angular/material/sort';
import { StatusColorPipe } from "../../../Shared/pipes/status-color.pipe";
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import { CloseError } from '../../../Core/services/common.service';
@Component({
  selector: 'app-location',
  standalone: true,
  imports: [AppLoggerModule, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule,
    LoaderComponent, FormsModule, InlineErrorMsgComponent, LocationFilterComponent, MatSortModule, StatusColorPipe,MatButtonModule,MatMenuModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
  providers : [LocationConstant]
})
export class LocationComponent implements OnInit {

  // basic variables
  columns : string[] = []
  rows : LocationRows[] = []
  allData : LocationRows[] = []
  currentRow! : LocationRows 
  selectedRows : LocationRows[] = []
  enableAllArchive : boolean = false
  enableAllActive : boolean = false
  isAllSelected : boolean = false;

  // related to pagination
  itemPerPage : number = 15;
  page : number = 1;
  dropDownSelectedValue : string = '15';
  loadingSpinner : boolean = false

  // Static value for drop downs
  numberOfSkeletonForDataTable: any[] = Array(9).fill(0)

  // related to error messages
  errorMsg:string = '';
  isErrorOccur:boolean = false;

  loading : boolean = false;

  constructor(public constant : LocationConstant,readonly service : LocationService,readonly popup: MatDialog,readonly route:Router){
    setTimeout(() => {
      this.loading = true;
    }, 2000);
    this.columns = this.constant.columns
  }


  // sorting data 

  // below function is use to sorting based on columns
  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') return;
    const isAsc = sort.direction === 'asc';
    this.rows = [...this.rows].sort((a, b) => {
      // Assert that `sort.active` is a key of LocationRows
      const key = sort.active as keyof LocationRows;
      return this.compare(a[key], b[key], isAsc);
    });
  }
  
  // Generic compare function
  compare<T>(a: T, b: T, isAsc: boolean): number {
    if (a < b) return isAsc ? -1 : 1;
    if (a > b) return isAsc ? 1 : -1;
    return 0;
  }

  // lifecycle hook for the component 
  ngOnInit():void{
    this.setPage()
  }

  // getting initial locations data
  setPage():void{
    this.loading = false;
    this.service.getData().subscribe({
      next : (response : LocationRows[]) => {
        if(response){
          this.rows = response
          this.allData = response
          this.loading = true;
        }
      },
      error : (error) => {
        this.errorMsg = error as string
      }
    })
  }

  // When click on close icon on inline error message
  closeInlineError(): void {
    const errorState = { errorMessages: this.errorMsg, isErrorOccur: this.isErrorOccur }
    CloseError.closeInlineError(errorState);
    this.errorMsg = errorState.errorMessages;
    this.isErrorOccur = errorState.isErrorOccur;
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
  handleSelectAll(isChecked:boolean):void{
    this.rows.forEach(item => (item.isChecked = isChecked));
    this.selectedRows = isChecked ? [...this.rows] : [];
    this.isAllSelected = isChecked;
  }
  handleRowSelected(targetRow:LocationRows, isChecked:boolean,row:LocationRows):void{
    if (targetRow) {
      targetRow.isChecked = isChecked;
      if (isChecked) {
        this.selectedRows.push(targetRow)
      } else {
        this.selectedRows = this.selectedRows.filter(item => item.name !== row.name);
      }
      if(this.selectedRows.length > 1){
        this.selectedRows.forEach((location) => {
          if(location.locationStatus === 'Active'){
            this.enableAllActive = false;
            this.enableAllArchive = true;
          }else{
            this.enableAllArchive = false;
            this.enableAllActive = true;
          }
        })
      }else{
        this.enableAllActive = false;
        this.enableAllArchive = false;
      }
    }
    this.isAllSelected  = this.selectedRows.length === this.allData.length;
  }

  // when select all record from header's checkbox
  SelectRecord(event : Event , action? : string , row?:LocationRows):void{
    if(event && this.rows && this.rows.length > 0){
      const inputElement = event?.target as HTMLInputElement;
      const isChecked = inputElement.checked
      if(action == 'All' && !row){
        this.handleSelectAll(isChecked);
      }else if(row){
        const targetRow = this.rows.find(item => item.name === row.name) as LocationRows;
        this.handleRowSelected(targetRow,isChecked,row)
      }
    }
  }


  // below function is use to set current row and open confirmation pop
  openConfirmationPopup(row:LocationRows , status? : string):void{
   this.currentRow = row
   this.statusChange(status)
  }


  // below function is use for archiving record 
  statusChange(status?:string):void{
    let context = ''
    if (status == this.constant.Archived) {
      context = this.constant.contextForArchiveRecord
    } else {
      context = this.constant.contextForActiveRecord
    }
    const popUp = this.popup.open(SuccessComponent , {
      data : {title : this.constant.titleForArchiveRecord , description : context , data : [] , customizeNameForSave : 'Sure' , aggregatorData : null},disableClose: true
    })
    popUp.afterClosed().subscribe((response)=>{
      this.loadingSpinner = true;
      if(response && this.currentRow){
         this.rows.forEach((ele:LocationRows) => {
          if(ele.name === this.currentRow.name){
            ele.locationStatus = ele.locationStatus === this.constant.Archived ? this.constant.Active : this.constant.Archived
          }
         })
        this.loadingSpinner = false
      }else{
        this.loadingSpinner = false
      }
    })
  }


  // filter code 
  filter(value:string):void{
    if (value.trim() !== '') {
      const searchTerm = value.toLowerCase();
      this.rows = this.allData.filter(locations =>
        Object.values(locations).some(cellValue => 
          cellValue != null && 
          (typeof cellValue === 'string' || typeof cellValue === 'number') && 
          cellValue.toString().toLowerCase().includes(searchTerm)
        )
      );
    }else{
      this.rows = this.allData
    }
  }

  // when value is changed in record state drop down 
  changeRecordStateValue(selectRecordState:string):void{
    if(selectRecordState && this.allData && selectRecordState !== 'All'){
      this.rows = this.allData.filter(items => items.locationStatus == selectRecordState)
    }else if(selectRecordState === 'All'){
      this.rows = this.allData
    }
  }

  // changing status from master options 
  selectedValuesStatusChange():void{
    if(this.selectedRows?.length > 1){
       const nameArray  = this.selectedRows.map(item => item.name)
       this.rows.forEach((item)=>{
        if(nameArray.indexOf(item.name)!==-1){
          item.locationStatus = this.enableAllActive ? 'Active' : 'Archived'
        }
       })
       this.selectedRows = []
       this.rows.forEach(item => (item.isChecked = false));
    }
  }
  gotoEditLocation(item:LocationRows):void{
    void this.route.navigateByUrl('view/edit-location/' + item.locationId)
  }
}
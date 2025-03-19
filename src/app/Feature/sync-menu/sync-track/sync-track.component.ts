import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule, Sort } from '@angular/material/sort';
import { EntityResponse, PageView, SyncTrackPopupData } from '../management/interface/sync-menu-interface';
import cloneDeep from 'lodash-es/cloneDeep';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ToastrService as ToasterService } from 'ngx-toastr';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DateFormatPipe } from "../../../Shared/pipes/date-format.pipe";

@Component({
  selector: 'app-sync-track',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, MatSortModule, ClipboardModule, DateFormatPipe],
  templateUrl: './sync-track.component.html',
  styleUrl: './sync-track.component.scss'
})
export class SyncTrackComponent implements OnInit {
  popupData: SyncTrackPopupData;
  columns = ['SR No.', 'External Entity Id', 'Status', 'Details'];
  pageSelectedValue: string = 'All';
  filterInputValue: string = ''
  page = new PageView()
  rows: EntityResponse[] = [];
  rowsClone: EntityResponse[] = [];
  masterShowFlag: boolean = false;
  enableSyncButton: boolean = false;
  previousSortDirection : string = ''
  restaurantName: string = ''
  searchSubject: Subject<string> = new Subject<string>();
  last_synced:string = ''
  constructor(public dialogRef: MatDialogRef<SyncTrackComponent>, @Inject(MAT_DIALOG_DATA) public data: SyncTrackPopupData,readonly toaster:ToasterService) {
    this.popupData = data;
    this.setJsonCopyData(data.data)
    this.rows = data.data;
    this.last_synced = data.last_synced
    this.restaurantName = this.toCamelCase(data.restaurantName);
    this.rowsClone = cloneDeep(this.rows)
  }
  ngOnInit(): void {
    console.log('ngOnInit')
    this.searchSubject.pipe(
      debounceTime(800), 
      distinctUntilChanged() 
    ).subscribe((searchTerm: string) => {
      this.onChangeInput(searchTerm);
    });
    // this.resetAggregators()
  }

  close(): void {
    this.dialogRef.close(false);
  }


  // when click on cross icons
  closeDialog(): void {
    this.dialogRef.close(false);
  }


  // empty 
  empty(): void {
    console.log('empty')
  }
  sortData(sort:Sort): void {
    const data = this.rows.slice();
    if (sort.direction === '') {
      sort.direction = this.previousSortDirection == 'asc' ? 'desc' : 'asc';
    } else if (this.previousSortDirection == sort.direction) {
      sort.direction = sort.direction === 'asc' ? 'desc' : 'asc';
    }
    const sortedArray = this.sortingLogic(data, sort);
    this.rows = sortedArray;
    this.previousSortDirection = sort.direction;
    // return { rows, this.previousSortDirection };
  }

  sortingLogic(data: EntityResponse[], sort: Sort): EntityResponse[] {
    return this.getSortedData(data, sort);
  }

  getSortedData(data: EntityResponse[], sort: Sort): EntityResponse[] {
    const isAsc = sort.direction === 'asc';
    return data
      .map((item) => item) // Create a shallow copy without modifying the original array
      .sort((a, b) => {
        switch (sort.active) {
          case 'status':
            return this.compare<string>(a?.status, b?.status, isAsc);
          case 'entity_type':
            return this.compare<string>(a?.entity_type, b?.entity_type, isAsc);
          default:
            return 0;
        }
      });
  }

  compare<T>(a: T, b: T, isAsc: boolean): number {
    if (a < b) return isAsc ? -1 : 1;
    if (a > b) return isAsc ? 1 : -1;
    return 0;
  }

  pageChange(data: number): void {
    this.page.pageNumber = data;
    console.log('data', data)
  }
  RecordPerPage(): void {
    this.page.pageNumber = 1;
    this.page.itemPerPage = Number(this.pageSelectedValue);
  }
  // when click on master collapse
  masterShow(): void {
    this.masterShowFlag = true;
    this.rows.forEach((item: EntityResponse) => {
      item['isShowComplexColumn'] = true;
    })
  }

  // when click on master expand
  masterHide(): void {
    this.masterShowFlag = false;
    this.rows.forEach((item: EntityResponse) => {
      item['isShowComplexColumn'] = false;
    })
  }

  // show complex column
  showError(item: EntityResponse): void {
    if (item) {
      item.isShowComplexColumn = true;
      this.masterShowFlag = true;
    }
  }
  // hide complex column
  hideError(item: EntityResponse): void {
    if (item) {
      item.isShowComplexColumn = false;
      this.masterShowFlag = this.rows.some((row) => row?.isShowComplexColumn);
    }
  }
  onChangeInput(event: string): void {
    const searchTerm = event.toLowerCase();
    this.rows = this.rowsClone.filter(item => {
      const itemStatus = (item.status.toLowerCase()).replaceAll('_', ' ');
      const entityType = (item.entity_type.toLowerCase()).replaceAll('_', ' ');
      const externalMessage = item.external_message ? (item.external_message.toLowerCase()).replaceAll('_', ' ') : '';
      return itemStatus.includes(searchTerm) || entityType.includes(searchTerm) || externalMessage.includes(searchTerm) || item.external_entity_id?.includes(event);
    })
  }
  // Call this method whenever you want to trigger the input event
  onInputChange(event: string): void {
    this.searchSubject.next(event); // Emit the value to the subject
  }

  toCamelCase(text: string): string {
    return text.toLowerCase().replace(/\b\w+/g, (word) => word[0].toUpperCase() + word.substring(1));
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

    setJsonCopyData(data:EntityResponse[]):void{
      data.forEach((item:EntityResponse)=>{
        item.stringJson = JSON.stringify(item);
      })
    }

}

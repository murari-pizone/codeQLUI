import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AggregatorList, ContactData, PopupData } from '../../const/common.constant';
import { SyncPopupResponse } from '../../../Feature/sync-menu/management/interface/sync-menu-interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService as ToasterService } from 'ngx-toastr';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule,CommonModule,ClipboardModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  providers:[ToasterService]
})
export class SuccessComponent implements OnInit {
  popupData = new PopupData();
  contactData: ContactData; 
  enableSyncButton:boolean = false
  syncTiming! : number;
  stringJson:string='';
  constructor(public dialogRef: MatDialogRef<SuccessComponent>,@Inject(MAT_DIALOG_DATA) public  data:  PopupData,readonly toaster:ToasterService) {
    this.contactData = {};
    this.popupData = data;
    if(this.popupData['completeJson']){
      this.stringJson = JSON.stringify(this.popupData['completeJson'])
    }
    this.syncTiming = data.syncTiming
    if (data && typeof data['contactData']) {
      this.contactData = data['contactData'];
  }
  }
  ngOnInit():void{
    this.resetAggregators()
  }

  close():void {
    if(this.dialogRef){
      if(this.popupData?.aggregatorData){
        const response : SyncPopupResponse = {
          success:true, aggregatorList : this.popupData.aggregatorData.aggregatorList
        }
        this.dialogRef.close(response);
      }else{
        this.dialogRef.close(true);
      }
    }
  }

  // when click on cross icons
  closeDialog():void{
    if(this.popupData?.aggregatorData){
      this.resetAggregators()
      const response : SyncPopupResponse = {
        success:false, aggregatorList : []
      }
      this.dialogRef.close(response);
    }
    this.dialogRef.close(false)
  }

  // Make all aggregators uncheck
  resetAggregators():void{
    if(this.popupData?.aggregatorData){
      if(this.popupData?.aggregatorData.aggregatorList?.length > 0){
        this.popupData?.aggregatorData.aggregatorList.forEach(ele => ele.isChecked = false)
      }
    }
  }

  // when checkbox is clicked below function is called
  onCheck(aggregator:AggregatorList):void{
    if(this.popupData?.aggregatorData?.aggregatorList){
      this.popupData.aggregatorData.aggregatorList.forEach((ele:AggregatorList)=>{
        if(ele.id == aggregator.id){
          ele.isChecked = !ele.isChecked
          this.enableSyncButton = ele.isChecked ? true : this.checkIsAllFalse(this.popupData.aggregatorData!.aggregatorList);
        }
      })
    }
  }

  // Disable sync button when any checkbox are not checked 
  checkIsAllFalse(list:AggregatorList[]):boolean{
    let flag : boolean = false;
    if(list){
      list.forEach((element:AggregatorList) => {
        if(element.isChecked){
          flag = element.isChecked
        }
      });
    }
    return flag;
  }

  // empty 
  empty():void{
    console.log('empty')
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
}

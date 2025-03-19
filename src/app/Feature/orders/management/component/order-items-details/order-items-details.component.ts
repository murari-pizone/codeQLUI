import { Component, Inject } from '@angular/core';
import { ContactData, PopupData } from '../../../../../Shared/const/common.constant';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderData, OrderItemDetails, OrderItemDetailsPopup } from '../../interface/ordersInterface';

@Component({
  selector: 'app-order-items-details',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule,CommonModule],
  templateUrl: './order-items-details.component.html',
  styleUrl: './order-items-details.component.scss'
})
export class OrderItemsDetailsComponent {
popupData = new PopupData();
  contactData: ContactData; 
  currentRow :OrderData[];
  orderItemDetails:OrderItemDetails[] ;
  enableSyncButton:boolean = false
  showMoreDetailsVar : boolean = false;
  constructor(public dialogRef: MatDialogRef<OrderItemsDetailsComponent>,@Inject(MAT_DIALOG_DATA) public  data:  OrderItemDetailsPopup) {
    this.contactData = {};
    console.log('dsfsd',data)
    this.currentRow = data.currentRow 
    this.orderItemDetails = data.orderItemDetails 
  //   this.popupData = data;
  //   if (data && typeof data['contactData']) {
  //     this.currentRow = data['currentRow'];
  // }
  }


  close(): void {
    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  }

  empty():void{
    console.log('empty')
  }
}

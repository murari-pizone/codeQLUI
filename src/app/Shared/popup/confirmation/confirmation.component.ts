import { Component, Inject, OnInit } from '@angular/core';
import { PopupData } from '../../const/common.constant';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent implements OnInit {
  popupData = new PopupData(); 
  enableSyncButton:boolean = false
  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,@Inject(MAT_DIALOG_DATA) public  data:  PopupData) {
    this.popupData = data;
  }
  ngOnInit():void{
    console.log('ngOnInit')
  }

  close():void {
    if(this.dialogRef){
        this.dialogRef.close(false);
    }
  }

  // when click on cross icons
  ok():void{
    this.dialogRef.close(true)
  }

  // empty 
  empty():void{
    console.log('empty')
  }
}

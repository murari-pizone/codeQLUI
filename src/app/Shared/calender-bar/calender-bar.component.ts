import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EventEmitter } from '@angular/core';

export interface DatesInformation{
  Date : string , 
  Day : string,
  OrdersCount:number;
  activeData:boolean 
}
@Component({
  selector: 'app-calender-bar',
  standalone: true,
  imports: [FormsModule,CommonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule,MatNativeDateModule],
  templateUrl: './calender-bar.component.html',
  styleUrl: './calender-bar.component.scss'
})
export class CalenderBarComponent {
  @Input() currentDate = new Date();
  @Output() DateChange  = new EventEmitter<Date>()
  @Input()  isLoading  : boolean = false;
  selectedDate!: Date;// Holds the selected date
  constructor(){}

  // on calender change
  onDateChangeEmit(event: MatDatepickerInputEvent<Date>): void {
    console.log(event)
    this.selectedDate = event.value as Date;
    this.DateChange.emit(this.selectedDate)
  }
}

// import { DatePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  formattedTime : string  = ''; 
  formattedDate : string   = '';
  transform(value?:string , convertTo?:string): string {
    if(value && convertTo){
      const datePipe = new DatePipe('en-US')
      switch(convertTo){
        case 'Date' : 
        this.formattedDate = datePipe.transform(value, 'd MMM, yyyy') || '';
        return this.formattedDate;
        case 'Time' : 
        this.formattedTime = datePipe.transform(value, 'h:mm a','UTC') || '';
        return this.formattedTime
      }
    }
    return ''
  }
}

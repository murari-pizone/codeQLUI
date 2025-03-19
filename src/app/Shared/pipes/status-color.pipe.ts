import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {

  transform(value : string , module? : string): string {
    if(value && module == 'location'){
      switch(value){
        case  'Active' : 
          return 'Active'
        case 'Archived' : 
          return 'Archived'
      }
    }
    else if(value && module == 'Last Synced'){
      switch(value){
        case 'NA':
          return 'black-Menu-status';
          case 'DONE':
          return 'green-Menu-status';
          case 'In progress':
            return 'blue-Menu-status';
      }
    }
    else if(value){
      switch(value){
        case 'Cancelled':
          return 'Cancelled';
        case 'Pending':
          return 'Pending'
        case 'Delivered':
          return 'Delivered'
        case 'Dispatched':
          return 'Dispatched'
        case 'Confirmed':
          return 'Confirmed'
        case 'Initiated':
          return 'Initiated'
        case 'Prepared':
          return 'Prepared'
        case 'PICKUP' :
          return 'Pending'
          
        // badge for order screen
        case 'ORDER_RECEIVED':
          return 'badge-blue';
        case 'ACKNOWLEDGED_TO_AGGREGATOR':
          return 'badge-cyan';
        case 'REQUESTED_TO_ERP':
          return 'badge-purple';
        case 'CONFIRMED_FROM_ERP':
          return 'badge-teal';
        case 'CANCELLED':
          return 'badge-red';
        case 'MFR':
          return 'badge-orange';
        case 'ARRIVED':
          return 'badge-green';
        case 'PICKEDUP':
          return 'badge-lime';
        case 'DELIVERED':
          return 'badge-darkgreen';

          // statics 

        case 'SYNCED':
           return 'badge-green';
        case 'IN PROGRESS':
          case 'NOT SYNCED YET':
          return 'badge-green';
        case 'NULL':
          return 'badge-gray';
        default:
          return 'badge-blue'; // Default for unknown states
      }
    }
    return ''
  }

}

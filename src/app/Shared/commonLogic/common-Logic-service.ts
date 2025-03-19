import { DatesInformation, IDateWiseCount } from "../../Feature/orders/management/interface/ordersInterface";
// import moment from 'moment';

export class commonLogicService {
    replaceUnderScore(item:string):string{
        if(item){
            return item.replaceAll('_',' ');
        }else{
            return item;
        }
    }

    transformData(input:IDateWiseCount[]): DatesInformation[] {
        return input.map(item => {
            const dateObj = new Date(item.EditedDate);
            const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            const date = dateObj.getDate().toString(); 
            return { Date: date, Day: day, OrdersCount: item.RecordCount,activeData: false};
        });
    }

    convertDate(inputDate: Date): string {
        const dateInString = inputDate.toString();
        const date = new Date(dateInString);
    
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }
    
        // Extract local date components
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
    
        // Return the date in 'YYYY-MM-DD' format
        return `${year}-${month}-${day}`;
    }
}
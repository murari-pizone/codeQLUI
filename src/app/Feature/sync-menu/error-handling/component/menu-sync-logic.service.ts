import { MenuErrorRow } from "../interface/menuSyncError-interface";

export class MenuErrorLogic {
  // Function to update the timestamps for all rows in the array
  static updateTimestamps(rows: MenuErrorRow[]): void {
    if (rows && rows.length > 0) {
      rows = rows.map((item: MenuErrorRow) => {
        return {
          ...item,
          created_at_json: {
            date: this.formatDate(item?.created_at),
            time: this.formatTime(item?.created_at)
          },
          updated_a_json: {
            date: this.formatDate(item?.Edited_Timestamp),
            time: this.formatTime(item?.Edited_Timestamp)
          }
        };
      });
    }
  }
  // make correct format create at and update at 
  static formatDate(date: string): string {
    if (date) {
      const localTime = new Date(date);
      const day = String(localTime.getDate()).padStart(2, '0');
      const month = String(localTime.getMonth() + 1).padStart(2, '0');
      const year = localTime.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return ''
  }

  // Function to format time into hh:mm:ss a (12-hour format with AM/PM)
  static formatTime(date: string): string {
    if (date) {
      const localTime = new Date(date);
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      return localTime.toLocaleTimeString('en-IN', optionsTime);
    }
    return ''
  }
}
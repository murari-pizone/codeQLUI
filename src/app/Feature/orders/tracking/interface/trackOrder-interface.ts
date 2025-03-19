export interface Order {
  id: number;
  status: 'Picked Up' | 'Delivered' | 'Confirmed' | 'Arrived';
  customerName: string;
  estimatedDelivery: string;
  driverName: string;
  driverContact: string;
  currentLocation?: string;
  timeline: TimelineEntry[];
  coordinates: Coordinates;
}
export interface OrderStatus {
  status: 'Confirmed' | 'Picked Up' | 'Delivered' | 'Arrived';
}

export interface Coordinates {
  lat: number;
  lng: number;
}
export interface TimelineEntry {
  status: string;
  timestamp: string;
}
export class SyncTrackPopupData {
    title: string = '';
    description: string = '';
    data?: SyncTrackOrderListData[];
    hideCrossIcon : boolean = false;
}

export interface SyncTrackOrderListData{
  Aggregator_Order_Id: number;
  Status_Code: number;
  Status_Message: string;
  Order_Edit: boolean;
  Description: string;
  Instructions: string;
  Callback_Url: string;
  Restaurant_Gross_Bill: number;
  Restaurant_Name: string;
  Outlet_Id: string;
  Customer_Phone_Number: string;
  Customer_Name: string;
  Customer_Id: number;
  Created_Timestamp: string;
  Edited_Timestamp: string;
  id: number;
  RowNum: number;
  payment_type?:string;
  order_type?:string;
  Status:string;
}
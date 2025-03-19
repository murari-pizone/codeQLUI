  export interface Order {
    // 'Order ID': string ,
    //  'Date':string ,
    //  'Customer Name': string,
     'Description':string ,
    //  'Aggregator':string ,
     'Location': string,
    //  'Amount': number,
     order_Status : string,
     
     // added new keys according to json 
     id: number; // Assuming id is a number
     order_date_time?: Date; // Assuming this is a date string that can be parsed
     customer_name: string;
     restaurant_gross_bill: string;
     delivery_type: string;
     showDropDown:boolean;

    callback_url: string;
    cart_cgst: string;
    cart_cgst_percent: string;
    cart_gst: string;
    cart_gst_percent: string;
    cart_igst: string;
    cart_igst_percent: string;
    cart_sgst: string;
    cart_sgst_percent: string;
    created_at: Date | null; // Assuming created_at can be a date or null
    customer_id: string;
    customer_phone_number: string;
    delivery_fee_coupon_restaurant_discount: string;
    instructions: string;
    is_thirty_mof: boolean;
    offer_data: string; // Assuming this is a JSON string
    order_cess_charges: string; // Assuming it's a string
    order_cess_expressions: string; // Assuming it's a string
    order_edit: boolean;
    order_edit_reason: string | null; // Could be null
    order_id: string;
    order_packing_charges: string;
    order_packing_charges_cgst: string;
    order_packing_charges_cgst_percent: string;
    order_packing_charges_gst: string;
    order_packing_charges_igst: string;
    order_packing_charges_igst_percent: string;
    order_packing_charges_sgst: string;
    order_packing_charges_sgst_percent: string;
    order_status: number; // Assuming order_status is a number
    order_type: string;
    outlet_id: string;
    payment_qr_url: string;
    payment_type: string;
    prep_time_details: {
        predicted_prep_time: number;
        max_decrease_threshold: number;
        max_increase_threshold: number;
    };
    restaurant_discount: string;
    restaurant_name: string;
    restaurant_service_charges: string;
    reward_type: string;
    transaction_id: string;
  }
  export interface DatesInformation{
    Date : string , 
    Day : string,
    OrdersCount:number;
    activeData:boolean 
    
  }
  export class Page {
    pageSize: number = 0;
    totalItems: number = 0
    currentPage: number = 0;
  }

  export class OrderDetails{
    pendingOrder : number = 0 ;
    completeOrder : number = 0 ;
    cancelOrder : number = 0 ;
    totalOrder : number = 0 ;
  }

  export interface OrderGet{
    totalCancelled : number;
    totalDelivered : number;
    totalPending : number;
    totalCount : number;
    totalRecordCount: number;
  }

  export class JsonBodyForAddAggregator{
      "aggregator_name": string
      "api_key": string
      "secret_key": string
      "endpoint_url": string
      "status": string
      "created_by": string
      "updated_by": string
      "auto_order_confirm" : boolean
      "id":string
  }
  

  export class JsonBodyForUpdateAggregator{
    'id':string;
    "aggregator_name": string
    "api_key": string
    "secret_key": string
    "endpoint_url": string
    "status": string
    "created_by": string
    "updated_by": string
  }

  export interface BootstrapModal {
    show(): void;
    hide(): void;
  }

  export interface PushOrderJson {
    ShopCode: string
    ItemDetails: string,
    BillAmt: number,
    OverallDiscountAmount: number,
    DiscountMaxCap: number,
    OnlineOrderId: string,
    ExternalOrderId: string,
    CpnCode: string,
    SPL_INSTRUCTIONS: string,
    CustMobNo: string,
    MySId: string
  }
  export interface getData{
    PageNumber : number ,
   itemPerPage : number
  }
  export interface OrderListData{
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
  }


  export interface IDateWiseCount {
    EditedDate : string,
    RecordCount : number
  }

  export interface OrderResponse {
    data : OrderData[]
    message : string
    statusCode : number
    success : string
    pagination  : Page
    totalCancelled ?: number;
    totalDelivered ?: number;
    totalPending ?: number;
    totalCount ?: number;
    totalRecordCount ?: number;
}
export interface OrderData{
    Aggregator_Order_Id: number
    Callback_Url: string
    Created_Timestamp: string
    Customer_Id: number
    Customer_Name: string
    Customer_Phone_Number: string
    Description: string
    ERP_Order_Id: string
    Edited_Timestamp: string
    Instructions: string
    Items: OrderItemDetails[]
    Order_Edit: boolean
    Order_Edit_Reason: string
    Outlet_Id: string
    Restaurant_Gross_Bill: number
    Restaurant_Name: string
    RowNum: number
    Status: string
    Status_Code: number
    Status_Message: string
    id: number
}
export interface OrderItemDetails{
    Created_Timestamp: string
    Edited_Timestamp: string
    External_Item_Id: string
    Final_Sub_Total: number
    Free_Quantity: number
    Is_Veg: boolean
    Name: string
    Order_Id: number
    Price: number
    Quantity:number
    Subtotal: number
    id: number
}

export interface OrderItemDetailsPopup {
    title: string ;
    description: string ;
    data?: unknown;
    currentRow:OrderData[];
    orderItemDetails:OrderItemDetails[]
}

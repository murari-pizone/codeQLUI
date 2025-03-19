
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


export class Page {
  pageSize: number = 0;
  totalItems: number = 0
  currentPage: number = 0;
}

export interface MenuErrorRow {
  'id' : number , 
  'Error'?:string;
  'shop_code' : number , 
  'restaurant_name':string,
  'Request_Id' : string , 
  'error' : string , 
  'created_at' : string , 
  'Edited_Timestamp' : string
  'ErrorJson'? : ErrorJson[],
  'StringifyError'?:string;
  status?:string,
  isShowComplexColumn : boolean ;
  created_at_json : DateAndTimeFormatObject
  updated_a_json : DateAndTimeFormatObject

}
 
export interface DateAndTimeFormatObject {
  date: string,
  time : string
}

export interface ErrorJson {
  error_field: string
  rejected_value:string
  message: string
}


export interface SyncPopupResponse {
  success: boolean
  aggregatorList: AggregatorList[];
}

export interface CommonResponseJson {
  data: MenuErrorRow[]
  message: string
  statusCode: number
  success: string
  pagination: Page
  currentPage?:string;
  pageSize:string;
  totalCount:number
}

export interface AggregatorList {
  name: string
  isChecked: boolean;
  contactData?: ContactData
  aggregator_name?: string
  id?: number
}

export interface ContactData {
  ErrorCode?: string;
  Timestamp?: string;
}

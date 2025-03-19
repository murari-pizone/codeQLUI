import { AggregatorList } from "../../../../Shared/const/common.constant"


export interface SingleMenuRow {
    ItemImage: string
    StatusResponse: string,
    ExtPlatform: string,
    State: string
    Region: string
    Brcode: number,
    Branch: string
    MainCategorySortOrder: number,
    MainCategoryId: string
    MainCategoryName: string
    CategorySortOrder: 1,
    CategoryId: string
    CategoryName: string
    Icode: 1,
    Iname: string
    Uom: string
    RateWithoutTax: number,
    GST: number,
    OptionSaleYN: string
    LiveStatus: string
    Included_platforms: string
    WebItmDescription: string
    Recommended: string
    OptionGroupName: string
    IndWeight: number,
    CountryCode: string,
    CountryName: string
}
export interface Param {
    'Timestamp': string,
    'Name': string,
    'Error No.': string,
}

export interface MenuRows {
    Add1: string
    Add2: string
    ContactNo: string
    Costcenter: string
    CountryCode: string
    CountryName: string
    GstNo: string
    Latitude: number
    Pincode: string
    Region: string
    ShopName: string
    StateName: string
    add3: string
    longitude: number
    Status: string
    isChecked?: boolean;
    id?:string
    brcode:string
    brname:string
    staticSyncedStatus:string
    staticTime : string;
    Edited_Timestamp? : string;
    Sync_Status?:string;
}


export interface SingleMenuRow {
    ItemImage: string
    StatusResponse: string,
    ExtPlatform: string,
    State: string
    Region: string
    Brcode: number,
    Branch: string
    MainCategorySortOrder: number,
    MainCategoryId: string
    MainCategoryName: string
    CategorySortOrder: 1,
    CategoryId: string
    CategoryName: string
    Icode: 1,
    Iname: string
    Uom: string
    RateWithoutTax: number,
    GST: number,
    OptionSaleYN: string
    LiveStatus: string
    Included_platforms: string
    WebItmDescription: string
    Recommended: string
    OptionGroupName: string
    IndWeight: number,
    CountryCode: string,
    CountryName: string
}

export interface JsonDataResponseOfGetAllOutlets {
    data: MenuRows[],
    statusText: string
}

export interface SyncMenuErrorBody {
    success: boolean
    message: string
}

export interface SyncPopupResponse {
    success: boolean
    aggregatorList: AggregatorList[];
}

// Main response interface
export interface SyncErrorResponse {
    status: string;
    error: string;
    // syncing?:boolean;
    data: []; // Array of ItemData objects
}

// ItemData interface
export interface ItemData {
    StatusResponse?: string;
    ExtPlatform?: string;
    State?: string;
    Region?: string;
    Brcode: number;
    Branch?: string;
    MainCategorySortOrder: number;
    MainCategoryId?: string;
    MainCategoryName?: string;
    CategorySortOrder: number;
    CategoryId?: string;
    CategoryName?: string;
    Icode: number;
    Iname?: string;
    Uom?: string;
    RateWithoutTax?: string;
    GST?: string;
    OptionSaleYN?: string;
    LiveStatus?: string;
    Included_platforms?: string;
    WebItmDescription?: string;
    Recommended?: string;
    OptionGroupName?: string;
    IndWeight?: string;
    CountryCode?: string;
    CountryName?: string;
    status?: string;
    syncTime?: string; // ISO 8601 format
}

export const paramForSort: Record<keyof ItemData, keyof ItemData> = {
    StatusResponse: 'StatusResponse',
    ExtPlatform: 'ExtPlatform',
    State: 'State',
    Region: 'Region',
    Brcode: 'Brcode',
    Branch: 'Branch',
    MainCategorySortOrder: 'MainCategorySortOrder',
    MainCategoryId: 'MainCategoryId',
    MainCategoryName: 'MainCategoryName',
    CategorySortOrder: 'CategorySortOrder',
    CategoryId: 'CategoryId',
    CategoryName: 'CategoryName',
    Icode: 'Icode',
    Iname: 'Iname',
    Uom: 'Uom',
    RateWithoutTax: 'RateWithoutTax',
    GST: 'GST',
    OptionSaleYN: 'OptionSaleYN',
    LiveStatus: 'LiveStatus',
    Included_platforms: 'Included_platforms',
    WebItmDescription: 'WebItmDescription',
    Recommended: 'Recommended',
    OptionGroupName: 'OptionGroupName',
    IndWeight: 'IndWeight',
    CountryCode: 'CountryCode',
    CountryName: 'CountryName',
    status: 'status',
    syncTime: 'syncTime', // ISO 8601 format
};



export interface GetAllMenu {
    data : SingleMenuRow[]
    message : string
    statusCode : number
    success : string
}

export interface GetAllMenu {
    data : SingleMenuRow[]
    message : string
    statusCode : number
    success : string
}

export interface SyncMenuFilterData {
    outlet_city : string[] 
    outlet_location : string[]
    outlet_restaurant : string[]
    outlet_region : string[]

}


export interface FilterDropDataValues {
    "CmpCode": string,
    "MenuSyncType": string ,
    "Region_Br_Value": string[] | {"ShopCode" : number}[],
    "UserName": null,
    "OnlinePartner": string

}
export interface FilterDropDataInterface {
    success : string , 
    data  : {
        outlets : {ShopCode : number , ShopName : string}[],
        regions : {Region : string}[]
    }, 
    message : string , 
    statusCode : number;
    filteredData : {
        out : string[],
        reg: string[],
    }
}


export interface FetchDataJson {
    "id"?:string
    "ShopCode"?:string
    "Region"?:string
}

export interface ErrorResponse {
    message: string;
  }


export interface InitialDataForForm {
    onlinePartnerList : string[]
    regionList : string[]
    menuCaptionList : string[]
    optionsList : string[]
}
export interface CommonResponseJson {
    data: []
    message: string
    statusCode: number
    success: string
    pagination: Page
}

export class Page {
    pageSize: number = 0;
    totalItems: number = 0
    currentPage: number = 0;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    order: number;
    sub_categories: SubCategory[];
}

export interface SubCategory {
    id: string;
    name: string;
    category_id: string;
    description: string;
    order: number;
}

export interface Item {
    id: string;
    category_id: string;
    sub_category_id: string;
    name: string;
    is_veg: boolean;
    description: string;
    price: number;
    gst_details: GstDetails;
    packing_charges: number;
    enable: number;
    in_stock: number;
    catalog_attributes: CatalogAttributes;
    variant_groups: any[]; // You can replace `any` with a proper interface when available
    addon_groups: any[];   // You can replace `any` with a proper interface when available
}

export interface GstDetails {
    igst: number;
    sgst: number | null;
    cgst: number | null;
    inclusive: boolean;
    gst_liability: string;
}

export interface CatalogAttributes {
    spice_level: string;
    sweet_level: string;
    gravy_property: string;
    bone_property: string;
    contain_seasonal_ingredients: boolean;
    quantity: Quantity;
    serves_how_many: number;
}

export interface Quantity {
    unit: string;
}

export interface MenuData {
    main_categories: Category[];
    items: Item[];
    data?:[];
    message?:string;
}

export class SyncCustomError extends Error {
    customMessage: string='';
    error?: {
        error: string; // This defines a key named 'error' in the object
        [key: string]: any; // This allows for additional properties in the object, if needed
    };
}

export interface ViewMenu {
    srNo?:number
    Brcode:number
    CategoryId:string
    CategoryName:string
    CategorySortOrder:number
    ExtPlatform:string
    Icode : number
    Iname : string
    LiveStatus : string
    MainCategoryId : string
    MainCategoryName : string
    MainCategorySortOrder : number
    OptionGroupName : string
    RateWithoutTax: number
    Recommended: string
    Uom: string
    WebItmDescription: string
    included_platforms: string
}

export interface ViewMenuPopup{
    title:string;
    data:ViewMenu[]
}

export interface GetViewMenu {
    data: ViewMenu[]
    title:string
    message: string
    statusCode: number
    page: number
    pageLimit: number
    success: string
    totalCount: number
    totalPages: number
}

export class PageView {
    itemPerPage: number = 10;
    pageNumber: number = 1;
    totalCount:number = 0;
}

export interface SyncTrackResponse {
    success: string;
    data: Record<string, EntityResponse>;
    message: string;
    statusCode: number;
    last_synced : string;
  }
  
 export interface EntityResponse {
    srNo?:number;
    request_id?: string;
    entity_type: string;
    external_entity_id?: string;
    external_message?: string;
    status: string;
    time: string;
    isShowComplexColumn?: boolean;
    stringJson?:string;
  }
  
  export class SyncTrackPopupData {
      title: string = '';
      description: string = '';
      restaurantName: string = '';
      data: EntityResponse[] =[];
      hideCancelButton: boolean = false;
      last_synced : string = '';
  }

export interface LoadingTable {
    view: boolean[];
    sync: boolean[];
    trackProgress: boolean[];
}

export interface DeleteResponse {
    success: string;
    data: Array<{
      response_message: string;
    }>;
    message: string;
    statusCode: number;
  }



  export interface CreateOutletConf {
    title: string ;
    data: CreateOutletData[] ;
    create:boolean;
  }

  export interface CreateOutletData{
    ExtPlatform: string;
    brcode: string;
    brname: string;
    liveFlg: string;
    reasonfordisabled: string;
    enaDisTime: string;
    enaDisUsr: string;
    ExtPlatformURLOrderCancel: string;
    ExtPlatformURLOrderStatus: string;
    ExtPlatformURLLoctionOnOff: string;
    ExtPlatformURLInventory: string;
    ExtPlatformURL: string;
    apikeyExtupd: string;
    NetOnOff: string;
    NetUpdUsr: string;
    NetUpdTime: string;
    NetUpdReson: string;
    InventoryMaintainYN: string;
    Edited_Timestamp: string;
    Sync_Status: string;
    isChecked: boolean;
    staticSyncedStatus: string;
    staticTime: string;
  }

  export interface RemoveOutletRequest {
    brcode: string;
  }

  export interface CreateMenuItemConf {
    title: string ;
    data: AddMenuItemDetails[] ;
    create:boolean;
  }
  
  export interface AddMenuItemDetails {
    Region: string;
    ExtPlatform: string;
    SubCatSort_order?: number;
    ExtSubcatId: string;
    ExtSubcat: string;
    CatSort_order: number;
    CatId: string;
    ExtCat: string;
    Cat: string;
    OptnGrpId: string;
    Icode: number;
    Iname: string;
    WebIname: string;
    frmtime: string; // ISO date format
    totime: string;  // ISO date format
    popitemYN: string;
    optionSaleYN: string;
    LiveStatus: string;
    Uom: string;
    included_platforms: string; // Comma-separated platforms
    WebItmDescription: string;
    Sort_Order?: number;
    Recommended: string;
    FoodType?: number;
    OptionGroupName: string | null;
  }

  export interface RemoveMenuItemRequest {
    Icode: string;
  }
  
import { SubMenuArray } from "../common-interface/common.interface";

export class PopupData {
    title: string = '';
    description: string = '';
    data?: unknown;
    completeJson?:[];
    hideCancelButton: boolean = false;
    customizeNameForSave: string | undefined
    aggregatorData : { showAggregatorList: boolean; aggregatorList: AggregatorList[]} | undefined
    hideCrossIcon : boolean = false;
    contactData! : ContactData;
    syncTiming!:number;
}

export interface AggregatorList{
    name : string 
    isChecked : boolean;
    contactData?: ContactData
    aggregator_name?:string
    id?:number
}
export interface ContactData {
    ErrorCode?: string;
    Timestamp?: string;
}

export interface CommonResponseJson {
    data : []
    message : string
    statusCode : number
    success : string
    pagination  : Page
}
export class Page {
    pageSize: number = 0;
    totalItems: number = 0
    currentPage: number = 0;
  }

export interface CommonResponseJson2 {
    data : []
    success : string
}

export class CommonConstantsForApplications {
    dropDownOptions : string[] = ['All', 'Pending' , 'Confirmed' , 'Delivered' , 'Canceled' , 'Accepted']
    aggregatorsList : string[] = ['All','Swiggy']
    publicContext : string = "You are about to publish the verified restaurant data to the selected aggregator. Ensure that all details are accurate before proceeding."
    syncAll : string = "You are about to sync the verified restaurant data. Ensure that all details are accurate before proceeding."
    PullERPContext : string = "This action will fetch the latest restaurant data from the ERP system. Please ensure you have the necessary permissions before proceeding."
    title='Action Confirmation'
    publishTitle = 'Publish to Aggregator'
    pullERPTitle = 'Pull Data from ERP'
    filterBy = ['Location','City','Restaurant Name','Region'];
    storeStatus = ['verificationStatus1', 'verificationStatus1', 'verificationStatus1'];
    publishStatus = ['publishStatus1', 'publishStatus1', 'publishStatus1'];
    verificationStatus = ['verificationStatus1', 'verificationStatus1', 'verificationStatus1'];
}

export class AppComponentConst {
    subMenuArray: SubMenuArray[] = [
        { linkName: 'Menu Sync', routeLink: 'sync-menu' },
        { linkName: 'Menu Error', routeLink: 'menu-syncError' },
    ];

    subCatalogueArray: SubMenuArray[] = [
        { linkName: 'Category', routeLink: 'category' },
        { linkName: 'Items', routeLink: 'items' },
        { linkName: 'Modifier Group', routeLink: 'modifier-group' },
        { linkName: 'Taxes', routeLink: 'taxes' },
        { linkName: 'Modifiers', routeLink: 'modifiers' },
        { linkName: 'Tags', routeLink: 'tags' },
        { linkName: 'Backups', routeLink: 'backups' },
    ];

    subOrderArray: SubMenuArray[] = [
        { linkName: 'Order List', routeLink: 'orders' },
        { linkName: 'Order Error', routeLink: 'order-error' }
    ];

    subAnalyticsArray: SubMenuArray[] = [
        { linkName: 'Home-Analytics', routeLink: 'analytics/home-analytics' },
        { linkName: 'Revenue', routeLink: 'analytics/revenue' },
        { linkName: 'Operations', routeLink: 'analytics/operations' },
        { linkName: 'Catalogue', routeLink: 'analytics/catalogue' },
    ]
}
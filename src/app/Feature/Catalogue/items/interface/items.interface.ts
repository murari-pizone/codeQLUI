export interface ItemsRowData {
    Items : string,
    CRM_Title : string, 
    Category : string,
    postalCode : number,
    Items_title? : string , 
    modifier_group_type? : string , 
    food_type? : string , 
    sort_order? : string , 
    isRecommended? : boolean;
    default_sales_price? : number ; 
    markup_price? : number; 
    marked_as_add_on? : boolean;
}
export class CreateItemsRowData {
    Items : string = '';
    CRM_Title : string = '';
    Category : string = '';
    postalCode : number = 0;
    Items_title? : string = '';
    modifier_group_type? : string = '';
    food_type? : string = '';
    sort_order? : string = '';
    isRecommended? : boolean = false;
    default_sales_price? : number = 0
    markup_price? : number = 0
    marked_as_add_on? : boolean = false;
}
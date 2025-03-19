export interface TaxesRowData {
    Name : string,
    ApplicableOn : string, 
    Items : string,
    PostId : number,
    Locations:string,
}

export interface ItemAndLocation{
    itemGroup:string;
    locationGroup:string;
    id:string;
}

export class ItemLocationGroup {
    itemPerPage: number = 10;
    totalItems: number = 0
    pageNumber: number = 1;
}
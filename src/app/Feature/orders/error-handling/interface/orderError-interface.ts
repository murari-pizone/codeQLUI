
export interface SupportData {
    ErrorCode: string | undefined;
    Timestamp: string | undefined;
}
export class Page {
    itemPerPage: number = 0;
    totalItems: number = 0
    pageNumber: number = 0;
}

export interface OrderErrorColumn {
    id:string,
    StatusResponse: string,
    ExtPlatform: string,
    State: string,
    Region: string,
    Brcode: number,
    Branch: string,
    MainCategorySortOrder: number,
    MainCategoryId: string,
    MainCategoryName: string,
    CategorySortOrder: number,
    CategoryId: string,
    CategoryName: string,
    Icode: number,
    Iname: string,
    Uom: string,
    RateWithoutTax: string,
    GST: string,
    OptionSaleYN: string,
    LiveStatus: string,
    Included_platforms: string,
    WebItmDescription: string,
    Recommended: string,
    OptionGroupName: string,
    IndWeight: string,
    CountryCode: string,
    CountryName: string,
    status: string,
    syncTime: string
}

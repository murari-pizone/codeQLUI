export interface LocationRows {
    name : string,
    city : string, 
    locationId : string, 
    MenuStatus : string, 
    associateItems : number,
    locationStatus : string,
    isChecked : boolean; 
    locationCount:number;
    address:string;
    phoneNo?:number;
    email : string;
}

export interface FilterForm { 
    'city' : string,
    'item' : string,
    'tag' : string,
    'publishStatus' : string,
    'VerificationStatus' : string,
    'StoreStatus' : string
}


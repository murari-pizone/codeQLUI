export class ListPage {
    itemPerPage: number = 10;
    totalItems: number = 0
    pageNumber: number = 1;
}

export interface ModifiersRowData {
    id?: string;
    title: string;
    crm_title: string;
    modifier_groups: string;
    locations: string;
    price: number;
}

export class ModifierCustomError extends Error {
    customMessage?: string;
    error?: {
        error: string; // This defines a key named 'error' in the object
        [key: string]: any; // This allows for additional properties in the object, if needed
    };
  }

  export interface ModifiersLocationData {
    name:string;
    location:string;
    inStock:boolean;
    stock_count:number;
    local_price:number;
  }

  export class ModifiersLocationPage {
    itemPerPage: number = 10;
    totalItems: number = 0
    pageNumber: number = 1;
}
export interface Aggregator {
    id: string;
    aggregator_name: string;
    api_key: string;
    secret_key: string;
    endpoint_url: string;
    status: string;
    toggleStatusButton:boolean;
    auto_order_confirm:boolean;
    updated_by?:string ;
    created_by?:string ;
  }

  export class AddForm {
    aggregator_name: string = ''
    api_key: string  = ''
    secret_key: string  = ''
    endpoint_url: string  = ''
    status?: string = '';
    toggleStatusButton?:boolean = false;
    auto_order_confirm?:boolean = false;
    updated_by?:string = ''
    created_by?:string = ''
  }

  
  export class EditForm {
    id : string = ''
    aggregator_name: string = ''
    api_key: string  = ''
    secret_key: string  = ''
    endpoint_url: string  = ''
    status?: string = '';
    toggleStatusButton?:boolean = false;
    auto_order_confirm?:boolean = false;
    updated_by?:string = ''
    created_by?:string = ''
  }

  export interface ResponseData {
    headers: {
      normalizedNames: Record<string, any>;
      lazyUpdate: any;
      headers: Record<string, any>;
    };
    status: number;
    statusText: string;
    url: string;
    ok: boolean;
    name: string;
    message: string;
    error: Record<string, any>;
  }
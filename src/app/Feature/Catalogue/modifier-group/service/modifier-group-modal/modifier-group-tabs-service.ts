import { Injectable } from "@angular/core";
import { IGetAllItemsTabRecords } from "./modifier-group-tabs-interface-service";
import { Observable, of } from "rxjs";
import { ItemsRowData } from "../../../items/interface/items.interface";


@Injectable({
    providedIn: 'root'
})

export class ModifierTabsService implements IGetAllItemsTabRecords {
    rows : ItemsRowData[] = []
    constructor(){
        this.rows = [
         { Items : 'Kachori with Sos', CRM_Title : 'First',  Category : 'First' , postalCode : 116767672},
         { Items : 'Kachori with Sos', CRM_Title : 'Second',  Category : 'Second',  postalCode : 115656562},
         { Items : 'Kachori with Sos', CRM_Title : 'Third',  Category : 'Third' , postalCode : 115656562},
         { Items : 'Kachori with Sos', CRM_Title : 'Fourth',  Category : 'Fourth',  postalCode : 8876565665},
         { Items : 'Kachori with Sos', CRM_Title : 'Fifth',  Category : 'Fifth' , postalCode : 88565676},
         { Items : 'Kachori with Sos', CRM_Title : 'Sixth',  Category : 'Sixth' , postalCode : 156565612},
         { Items : 'Kachori with Sos', CRM_Title : 'Seventh',  Category : 'Seventh',  postalCode : 115656562},
         { Items : 'Kachori with Sos', CRM_Title : 'Eight',  Category : 'Eight',  postalCode : 156565612},
         { Items : 'Kachori with Sos', CRM_Title : 'Nine',  Category : 'Nine',  postalCode : 8875656566},
         { Items : 'Kachori with Sos', CRM_Title : 'Ten',  Category : 'Ten'  ,postalCode : 8956565689},
         { Items : 'Kachori with Sos', CRM_Title : 'Eleven',  Category : 'Eleven' , postalCode : 8985656659},
     ]
    }
    getAllItemTabRecords():Observable<ItemsRowData[]>{
        return of(this.rows)
    }
}
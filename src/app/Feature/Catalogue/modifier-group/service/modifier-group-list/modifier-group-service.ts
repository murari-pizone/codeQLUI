import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IGetAllModifierGroupRecords } from "./modifier-group-interface-service";
import { modifierGroupRowData } from "../../interface/modifier-group.interface";

@Injectable({
    providedIn: "root",
})

export class ModifierGroupService implements IGetAllModifierGroupRecords {
    listOfModifierGroup : modifierGroupRowData[] = []
    constructor() {
        this.listOfModifierGroup = [
            { name: "Quantity", type: "Optional", associated_items: 10, modifiers: 5, CRM_title : 'Gulab Jamun',},
            { name: "Quantity", type: "Mandatory", associated_items: 15, modifiers: 3, CRM_title : 'Gulab Jamun',},
            { name: "Quantity", type: "Optional", associated_items: 8, modifiers: 4, CRM_title : 'Gulab Jamun',},
            {name: "Quantity",type: "Optional",associated_items: 12,modifiers: 6, CRM_title : 'Gulab Jamun',},
            { name: "Quantity", type: "Mandatory", associated_items: 20, modifiers: 10, CRM_title : 'Gulab Jamun',},
            { name: "Quantity", type: "Optional", associated_items: 10, modifiers: 5,},
            { name: "Quantity", type: "Mandatory", associated_items: 15, modifiers: 3,},
            { name: "Quantity", type: "Optional", associated_items: 8, modifiers: 4, CRM_title : 'Gulab Jamun',},
            {name: "Quantity",type: "Optional",associated_items: 12,modifiers: 6,},
            { name: "Quantity", type: "Mandatory", associated_items: 20, modifiers: 10, CRM_title : 'Gulab Jamun',}, 
        ]
    }

    getAllModifierGroupRecords():Observable<modifierGroupRowData[]>{
          return of(this.listOfModifierGroup)
    }
}   


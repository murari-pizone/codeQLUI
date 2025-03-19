import { Observable } from "rxjs";
import { modifierGroupRowData } from "../../interface/modifier-group.interface";

export  interface IGetAllModifierGroupRecords {
    getAllModifierGroupRecords():Observable<modifierGroupRowData[]>
}
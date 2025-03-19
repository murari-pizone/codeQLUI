import { Observable } from "rxjs";
import { ModifiersRowData } from "../modifiers-interface/modifiers.interface";

export  interface IGetAllModifiers {
    getAllModifiers():Observable<ModifiersRowData[]>
}
import { Observable } from "rxjs";
import { ItemsRowData } from "../../interface/items.interface";

export  interface IGetAllItems {
    getAllItems():Observable<ItemsRowData[]>
}
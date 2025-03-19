import { Observable } from "rxjs";
import { ItemsRowData } from "../../../items/interface/items.interface";

export interface IGetAllItemsTabRecords{
    getAllItemTabRecords():Observable<ItemsRowData[]>
}
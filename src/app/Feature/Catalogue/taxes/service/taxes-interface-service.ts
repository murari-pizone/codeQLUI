import { Observable } from "rxjs";
import { TaxesRowData } from "../interface/taxes-interface";

export  interface IGetAllTaxes {
    getAllTaxes():Observable<TaxesRowData[]>
}
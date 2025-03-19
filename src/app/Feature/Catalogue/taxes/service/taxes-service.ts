import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaxesRowData } from '../interface/taxes-interface';
import { IGetAllTaxes } from './taxes-interface-service';

@Injectable({
  providedIn: 'root',
})
export class TaxesListService implements IGetAllTaxes {
   rows : TaxesRowData[] = []
   constructor(){
       this.rows = [
        { Name: "Sales Tax", ApplicableOn: "Services", Items: "Consulting", PostId: 102, Locations: "California" },
        { Name: "Income Tax", ApplicableOn: "Income", Items: "Salary", PostId: 103, Locations: "Texas" },
        { Name: "Luxury Tax", ApplicableOn: "Products", Items: "Luxury Cars", PostId: 104, Locations: "Florida" },
        { Name: "Service Tax", ApplicableOn: "Services", Items: "Hospitality", PostId: 105, Locations: "Nevada" },
        { Name: "Property Tax", ApplicableOn: "Real Estate", Items: "Residential", PostId: 106, Locations: "Illinois" },
        { Name: "Entertainment Tax", ApplicableOn: "Services", Items: "Movies", PostId: 107, Locations: "New Jersey" },
        { Name: "Import Duty", ApplicableOn: "Products", Items: "Furniture", PostId: 108, Locations: "Seattle" },
        { Name: "Excise Duty", ApplicableOn: "Products", Items: "Tobacco", PostId: 109, Locations: "Kentucky" },
        { Name: "Road Tax", ApplicableOn: "Transportation", Items: "Vehicles", PostId: 110, Locations: "Georgia" },
        { Name: "Green Tax", ApplicableOn: "Environment", Items: "Industrial Emissions", PostId: 111, Locations: "Ohio" },
        { Name: "Corporate Tax", ApplicableOn: "Income", Items: "Company Revenue", PostId: 112, Locations: "Delaware" },
        { Name: "Health Tax", ApplicableOn: "Healthcare", Items: "Insurance", PostId: 113, Locations: "Massachusetts" },
        { Name: "Education Tax", ApplicableOn: "Services", Items: "Tuition Fees", PostId: 114, Locations: "Pennsylvania" },
        { Name: "Tourism Tax", ApplicableOn: "Services", Items: "Hotels", PostId: 115, Locations: "Hawaii" }
    ]
   }

   getAllTaxes():Observable<TaxesRowData[]>{
      return of(this.rows)
   }
}
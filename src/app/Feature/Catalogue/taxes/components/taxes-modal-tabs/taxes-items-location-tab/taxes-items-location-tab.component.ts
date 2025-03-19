import { Component, ViewChild } from '@angular/core';
import { TaxesConstant } from '../../../const/taxes-constant';
import { MatTableModule } from '@angular/material/table';
import { ItemAndLocation, ItemLocationGroup } from '../../../interface/taxes-interface';
import { NgxPaginationModule } from 'ngx-pagination';
import  * as bootstrap from 'bootstrap';
import { NestedItemLocationComponent } from '../nested-item-location/nested-item-location.component';

@Component({
  selector: 'app-taxes-items-location-tab',
  standalone: true,
  imports: [MatTableModule , NgxPaginationModule, NestedItemLocationComponent],
  templateUrl: './taxes-items-location-tab.component.html',
  styleUrl: './taxes-items-location-tab.component.scss'
})
export class TaxesItemsLocationTabComponent {

  columns: string[] = [];
  taxesConstant = new TaxesConstant();
  rows: ItemAndLocation[] = []
  page = new ItemLocationGroup;
  cities:string[]=['Delhi','Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Chandigarh']
  currentRow: ItemAndLocation[]=[]
  showSideBar: boolean = false;
    @ViewChild(NestedItemLocationComponent) NestedItemLocation!: NestedItemLocationComponent;

  constructor(){
    this.columns = this.taxesConstant.itemAndLocationColumns;
    this.rows = [
      { itemGroup: "GST 5%", locationGroup: "Delhi", id: "1" },
      { itemGroup: "GST 12%", locationGroup: "Mumbai", id: "2" },
      { itemGroup: "GST 18%", locationGroup: "Bangalore", id: "3" },
    ]
  }

  addNewPair():void{
    const newPair = {
      itemGroup:'GST ' + (Math.floor(Math.random() * 100)).toString() + '%', 
      locationGroup: this.cities[Math.floor(Math.random() * this.cities.length)],
      id:(this.rows.length + 1).toString(),
    }
    this.rows.push(newPair)
    console.log('this.row',this.rows)
  }

  removeLocGroup(id:string):void{
    const removalItem = this.rows.findIndex(item=>{ return item.id  === id})
    console.log('removalItem',removalItem)
    if(removalItem !== -1){
      this.rows.splice(removalItem,1)
    }

  }

  empty():void{
    console.log('--')
  }

   // getting the child offCampus
    openOffcanvas(id: string , row:ItemAndLocation) :void{id
      this.currentRow = [row];
      this.showSideBar = true;
        const editItemElement = this.NestedItemLocation.getItemLocationNest();
        if(editItemElement){
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const offcanvas = new bootstrap.Offcanvas(editItemElement.nativeElement);
          offcanvas.show();
        }
    }
}

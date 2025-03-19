import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AggregatorList } from '../../../../../Shared/const/common.constant';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { itemsConstant } from '../../const/items.constant';

@Component({
  selector: 'app-items-filter-modal',
  standalone: true,
  imports: [FormsModule,CommonModule,MatButtonModule,MatMenuModule],
  templateUrl: './items-filter-modal.component.html',
  styleUrl: './items-filter-modal.component.scss'
})
export class ItemsFilterModalComponent implements OnInit {
  selectedValue:string = this.constant.All
  aggregatorsList : AggregatorList[] = []
  filterInputValue:string = '';
  readonly filterData: Subject<string> = new Subject<string>();
  @Output() searchFilter =  new EventEmitter<string>()
  @Output() changeDropDownValue = new EventEmitter<string>()
  selectedValueRegion : string = 'All Regions'
  listSelectedValueRegion : string[] = [ "All Regions", "North India" , "South India" , "West India", "Northeast India" , "East India" ]
  constructor(public constant : itemsConstant){
    const storedAggregators = localStorage.getItem('aggregatorList');
    if(storedAggregators){
      this.aggregatorsList = JSON.parse(storedAggregators) as AggregatorList[]
      this.aggregatorsList = this.aggregatorsList.map(item => ({ ...item , isChecked: false }));
    }
  }
  
  ngOnInit() :void{
    this.filterData.pipe(debounceTime(600),distinctUntilChanged()).subscribe(value => {this.filterEmit(value)});
  }

  // emit filter function on parent component
  filterEmit(value:string):void{
    this.searchFilter.emit(value)
  }

  // when user enter some text in input
  onChangeInput(value:string):void{
  this.filterData.next(value);
  }

  gotoAddLocation():void{
    console.log('All Location')
  }

  // when drop down selection value is changed
  selection():void{
    this.changeDropDownValue.emit(this.selectedValue)
   }
}

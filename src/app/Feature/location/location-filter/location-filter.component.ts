/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, Input, OnInit, Output ,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocationConstant } from '../const/location.const';
import { FilterForm, LocationRows } from '../interface/location.interface';
import { CommonModule } from '@angular/common';
import { Offcanvas } from 'bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AggregatorList } from '../../../Shared/const/common.constant';

@Component({
  selector: 'app-location-filter',
  standalone: true,
  imports: [FormsModule,CommonModule,MatButtonModule,MatMenuModule],
  templateUrl: './location-filter.component.html',
  styleUrl: './location-filter.component.scss',
  providers : [LocationConstant]
})
export class LocationFilterComponent implements OnInit  {
  @Output() changeDropDownValue = new EventEmitter<string>()
  @Output() changeRecordStateValue = new EventEmitter<string>()
  @Output() selectedValuesStatusChange = new EventEmitter<any>()
  @Input() dropDownOptions : string[] = ['All', 'Pending' , 'Confirmed' , 'Delivered' , 'Canceled' , 'Accepted']
  @Input() isLocationModule : boolean = true;
  @Input() selectedRows : LocationRows[] = []
  @Input() enableAllArchive : boolean = false
  @Input() enableAllActive : boolean = false
  @Input() component : string = ''

  // Filter Related Variables 
  @ViewChild('locationFilter', { static: true }) locationFilter!: ElementRef;
  @Output() searchFilter =  new EventEmitter<string>()
  readonly filterData: Subject<string> = new Subject<string>();
  filterInputValue:string = '';
  filterError : string = '';
  

  // picking up static data for filters 
  cities = this.constant.cities;
  tags = this.constant.cities
  items = this.constant.items

  // all filters models
  selectedCity = '';  
  selectedTag = '';  
  selectedItem = '';  
  selectedStoreStatus = '';  
  selectedPublishStatus = '';  
  selectedVerificationStatus = '';  

  constructor(public constant : LocationConstant, private readonly router:Router){
    const storedAggregators = localStorage.getItem('aggregatorList');
    if(storedAggregators){
      this.aggregatorsList = JSON.parse(storedAggregators) as AggregatorList[]
      this.aggregatorsList = this.aggregatorsList.map(item => ({ ...item , isChecked: false }));
    }
  }
  
  // static lists
  aggregatorsList : AggregatorList[] = []
  recordStateOptions : string[] = this.constant.recordStateList
  selectedRecordState : string = 'Active'
  selectedValue:string = this.constant.All

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
  
  // when drop down selection value is changed
  selection():void{
   this.changeDropDownValue.emit(this.selectedValue)
  }

  // when record state selection value is changed
  recordStateDropDown():void{
    this.changeRecordStateValue.emit(this.selectedRecordState)
  }

  gotoAddLocation():void{
    void this.router.navigateByUrl('view/add-location')
  }

  // when click on apply button 
  onSubmit():void{

    this.clearPreviousError()
    const form : FilterForm = {
      'city' : this.selectedCity,
      'item' : this.selectedItem,
      'tag' : this.selectedTag,
      'publishStatus' : this.selectedPublishStatus,
      'VerificationStatus' : this.selectedVerificationStatus,
      'StoreStatus' : this.selectedStoreStatus
    }
    if(this.isFormValid(form)){
      const offcanvasElement = this.locationFilter?.nativeElement as HTMLElement;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-unsafe-member-access
      let offcanvasInstance: Offcanvas | null = Offcanvas.getInstance(offcanvasElement);
      if (offcanvasInstance === null) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        offcanvasInstance = new Offcanvas(offcanvasElement);
      }
      if (offcanvasInstance instanceof Offcanvas) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        offcanvasInstance.hide();
      }
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop instanceof HTMLElement) {
        backdrop.remove();
      }
      offcanvasElement.classList.remove('show');

    }else{
      this.filterError = 'Please select value in at least one input'
    }
  }

  // checking all values having value or not in form 
  isFormValid(form : FilterForm):boolean{
    const error : string[] = []
    if(form){
      for(const i in form){
        if(form[i as keyof FilterForm]  == ''){
          const fieldError = i + 'field is empty';
          error.push(fieldError)
        }
      }
      if(error.length == 6){
        return false;
      }
    }
    return true;
    }

  
  // clearing previous error 
  clearPreviousError():void{
    this.filterError = '' 
  }

  // reset model values 

  resetModelValues():void{
    this.filterError = ''
    this.selectedCity = '';  
    this.selectedTag = '';  
    this.selectedItem = '';  
    this.selectedStoreStatus = '';  
    this.selectedPublishStatus = '';  
    this.selectedVerificationStatus = '';
  }
  statusChangeEmit():void{
   this.selectedValuesStatusChange.emit()
  }
  empty():void{
    console.log('keyUp')
  }
}

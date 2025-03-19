import { Component, Input, OnInit, Output ,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AggregatorList, CommonConstantsForApplications } from '../const/common.constant';
import { FilterDropDataInterface, FilterDropDataValues, MenuRows, SyncMenuFilterData } from '../../Feature/sync-menu/management/interface/sync-menu-interface';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonService } from '../../Core/services/common.service';
import { Offcanvas } from 'bootstrap';
import { CalenderBarComponent } from "../calender-bar/calender-bar.component";
import { LoaderComponent } from "../loader/loader.component";
import { CustomError } from '../../Feature/authentication/interface/login-interface';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, NgMultiSelectDropDownModule, ReactiveFormsModule, CalenderBarComponent, LoaderComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers : [CommonConstantsForApplications]
})
export class FilterComponent implements OnInit {

  constructor(public constant : CommonConstantsForApplications , public commonService : CommonService){
    const storedAggregators = localStorage.getItem('aggregatorList');
    if(storedAggregators){
      this.aggregatorsList = JSON.parse(storedAggregators) as AggregatorList[]
    }
  }
  @Output() filter =  new EventEmitter<string>()
  readonly filterData: Subject<string> = new Subject<string>();
  filterInputValue:string = '';
  selectedFilterBy = '';  


  selectedRestaurant : string[] = ['All'];  
  selectedShopCode : string[]  = []; 
  selectedCities : string[]  = ['All']; 
  selectedLocation: string[] = ['All'] 
  selectedRegions : string[] = ['All']; 


  selectedStoreStatus = '';  
  selectedPublishStatus = '';  
  selectedVerificationStatus = '';  
  selectedCity = '';
  filterError : string = '';
  

  // Aggregators
  selectedValue:string = 'All Aggregators';
  aggregatorsList : AggregatorList[] = []

  // Category
  selectedCategory:string = 'Active'
  categoryList = ['Active','Inactive']
  filteredRegionsArray : string[] = []
  filteredOutletsArray : string[] = []

  // Regions 
  selectedValueRegion : string = 'All Regions'
  selectedLocationOperate : string = 'All Location Selected';
  selectedPlatform : string = 'All Platform Selected';
  listSelectedValueRegion : string[] = [ "All Regions", "North India" , "South India" , "West India", "Northeast India" , "East India" ]
  operateLocation : string[] = ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata'];
  operatePlat : string[] = ['Swiggy'];
  dateRanges = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This Month'];
  selectedDateRange = 'Last 7 days';


  filter_dropDown_outlet_options = ['Menu Sync']
  filter_dropDown_category_options = ['Regions' , 'Branches']
  filter_dropDown_online_partner_options = ['Swiggy']

  filterBy = this.constant.filterBy;
  tags = this.constant.filterBy;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {
    enableCheckAll:false,
    singleSelection: false,              
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    // allowSearchFilter: true     
  };
  dropDownSettingForSyncError = {
    singleSelection: false,
    enableCheckAll: false,
  }

  dropDownSettingForFilter = {
    singleSelection: true,
  }

  // variables for sync filter
  @Input()  syncMenuDataLists! : SyncMenuFilterData 
  @Input()  currentDate  =  new Date() 
  @Input()  isLoading  : boolean = false;
  
  @Input() component : string = '';
  @Input() shopCodeArray : number[] = []
  @Output() changeAggregatorDropDown = new EventEmitter<string>()
  @Output() refreshOrders = new EventEmitter()
  @Output() addItemEmit = new EventEmitter()
  @Output() outletCreate = new EventEmitter()
  // @Output() shopCodeChange = new EventEmitter<string[]>()
  @Output() confirmationPopUp = new EventEmitter<string>()
  @Output() getFilterDataForSyncMenu = new EventEmitter<string>()
  @Output() backEmit = new EventEmitter<string>()
  @Output() commonPermissionPopUp = new EventEmitter<{'title' : string , 'context' : string , 'loadingText' : string}>()
  @Output() submitSyncMenuFilter = new EventEmitter<SyncMenuFilterData>()
  @Output() resetFilter = new EventEmitter<SyncMenuFilterData>()
  @Output() DateChange = new EventEmitter<Date>()
  @Input() dropDownOptions : string[] = this.constant.dropDownOptions
  @Input() isLocationModule : boolean = true;
  @Input() selectedRows : MenuRows[] = [];



  // Common filter data of option , region , menu and online partner 
  option : string = 'Menu Sync'
  menu_Caption : string = ''
  region : string[] = []
  branches : string[] = []
  online_Partner :string = ''
  filterDropData! : FilterDropDataInterface

  @ViewChild('SyncMenuFilter', { static: true }) SyncMenuFilter!: ElementRef;
  @Output() submitFilter = new EventEmitter<FilterDropDataValues>()

  ngOnInit() :void{
    this.filterData.pipe(debounceTime(600),distinctUntilChanged()).subscribe(value => {this.filterEmit(value)});
    if(this.aggregatorsList && this.aggregatorsList.length > 0){
      this.aggregatorsList.map(item => item.isChecked = false)
    }
    this.aggregatorsList = [{ name: 'Swiggy', isChecked: true , aggregator_name:'Swiggy'}];
  }

  // emit filter function on parent component
  filterEmit(value:string):void{
    this.filter.emit(value)
  }

  // when user enter some text in input
  onChangeInput(value:string):void{
    this.filterData.next(value);
  }
  
  // when drop down selection value is changed
  selection():void{
   this.changeAggregatorDropDown.emit(this.selectedValue)
  }


  confirmationPopUpEmit(loadingText:string):void{
    if(this.selectedRows.length > 0){
      this.confirmationPopUp.emit(loadingText)
    }else{
      return 
    }
  }

  empty():void{
    console.log('empty')
  }

  clearAllSelections():void{
    this.selectedFilterBy = '';
    // this.option  = ''
    this.menu_Caption  = ''
    this.region  = []
    this.online_Partner = ''
    this.branches = []
  }

  commonPermissionPopEmit(title:string,context:string,loadingText:string):void{
      if(this.selectedRows && this.selectedRows.length > 0){
      this.commonPermissionPopUp.emit({'title' : title , 'context' : context , 'loadingText' : loadingText})
    }
  }

  
  // emit filter function on parent component


  toggleSelection(location: string): void {
    const index = this.selectedLocation.indexOf(location);
    if (index > -1) {
      this.selectedLocation.splice(index, 1);  // Remove if already selected
    } else {
      this.selectedLocation.push(location);  // Add if not selected
    }
  }

  // Check if the location is selected
  isSelected(location: string): boolean {
    return this.selectedLocation.includes(location);
  }

  setDefaultValues():void{
    this.filterError = '' 
    if(this.selectedFilterBy === 'Location' && this.syncMenuDataLists){
      this.selectedRestaurant =[]
      this.selectedCities = []
      this.selectedRegions = []
      // this.selectedLocation = this.syncMenuDataLists.outlet_location
      this.selectedLocation = ["All"];
    }
    else if(this.selectedFilterBy === 'Restaurant Name' && this.syncMenuDataLists){
      this.selectedCities = []
      this.selectedRegions = []
      this.selectedLocation = []
      // this.selectedRestaurant = this.syncMenuDataLists.outlet_restaurant
      this.selectedRestaurant = ["All"];
    }
    else if(this.selectedFilterBy === 'City' && this.syncMenuDataLists){
      this.selectedRegions = []
      this.selectedLocation = []
      this.selectedRestaurant = []
      // this.selectedCities = this.syncMenuDataLists.outlet_city
      this.selectedCities = ["All"];
    }
    else if(this.selectedFilterBy === 'Region' && this.syncMenuDataLists){
      this.selectedLocation = []
      this.selectedRestaurant = []
      this.selectedCities = []
      // this.selectedRegions = this.syncMenuDataLists.outlet_region
      this.selectedRegions = ["All"];
    }
  }

// on submit for location and region , city filter
// onSubmit():void{
//   const form : SyncMenuFilterData = {
//     outlet_city : this.selectedCities,
//     outlet_location : this.selectedLocation,
//     outlet_restaurant : this.selectedRestaurant,
//     outlet_region : this.selectedRegions
//   }
//   if(form){
//     const offcanvasElement = this.SyncMenuFilter?.nativeElement as HTMLElement;
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-unsafe-member-access
//     let offcanvasInstance: Offcanvas | null = Offcanvas.getInstance(offcanvasElement);
//     if (offcanvasInstance === null) {
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//       offcanvasInstance = new Offcanvas(offcanvasElement);
//     }
//     if (offcanvasInstance instanceof Offcanvas) {
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       offcanvasInstance.hide();
//     }
//     offcanvasElement.classList.remove('show');
//     const backdrop = document.querySelector('.offcanvas-backdrop');
//     if (backdrop instanceof HTMLElement) {
//       backdrop.remove();
//     }
//     this.submitSyncMenuFilter.emit(form)
//   }else{
//     // this.isErrorOccur = true;
//     this.filterError = 'Please select value in at least one input'
//   }
// }

getShopCodes(outletsArray : {ShopCode : number , ShopName : string}[], outletValue : string[]) : {"ShopCode" : number}[]{
  return outletsArray
    .filter(outlet => outletValue.includes(outlet.ShopName))
    .map(outlet => ({ "ShopCode" :  outlet.ShopCode}));
}

// onsubmit for option , online_Partner and region filter
onSubmit():void{
   if(this.option === '' || this.menu_Caption === ''){
    this.filterError = 'Please select value'
   }else{
    let valueArray : {"ShopCode" : number}[] | string[] = []
    if(this.menu_Caption === 'Branches'){
      valueArray =  this.getShopCodes(this.filterDropData.data.outlets , this.branches)
    }else{
      valueArray = this.region
    }
    const form = {
       "CmpCode": "AABSIPL",
        "MenuSyncType": this.menu_Caption === 'Branches'  ? 'Brwise' : 'Reginwise' ,
        "Region_Br_Value": valueArray,
        "UserName": null,
        "OnlinePartner": "Swiggy"
      }

        if(form){
            const offcanvasElement = this.SyncMenuFilter?.nativeElement as HTMLElement;
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
            offcanvasElement.classList.remove('show');
            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop instanceof HTMLElement) {
              backdrop.remove();
            } 
          this.submitFilter.emit(form)
        } 
   }
}

  resetModelValues():void{
    this.clearAllSelections()
    this.filterError = ''
    this.selectedFilterBy = '';   
    this.selectedStoreStatus = '';  
    this.selectedPublishStatus = '';  
    this.selectedVerificationStatus = '';
    this.selectedCities = []
    this.selectedRegions = []
    this.selectedLocation = []
    this.selectedRestaurant = [];
    this.filterDropData = {} as FilterDropDataInterface
    this.resetFilter.emit(undefined)
  }

/* eslint-disable */
onSelectAll(items: any , type : string , deselect? : string): void {
  if(deselect){
    this.clearSelection(type)
  } else {
    this.updateSelection(type,items)
  }
}

clearSelection(type: string): void {
  if (type === "City") {
    this.selectedCities = [];
  } else if (type === 'Location') {
    this.selectedLocation = [];
  } else if (type === 'Restaurant Name') {
    this.selectedRestaurant = [];
  } else if (type === 'Region') {
    this.selectedRegions = [];
  }
}

updateSelection(type: string, items: any): void {
  if (type === "City") {
    this.selectedCities = items;
  } else if (type === 'Location') {
    this.selectedLocation = items;
  } else if (type === 'Restaurant Name') {
    this.selectedRestaurant = items;
  } else if (type === 'Region') {
    this.selectedRegions = items;
  }
}


  // getBack():void{
  //   this.backEmit.emit()
  // }

  onSelect(event: any, control: string): void {
    if (event === 'All') {
      this.selectAll(control);
    } else {
      this.removeAllIfPresent(control);
    }
  }

  onSelectRegionOrBranches(){
     this.region = []
     this.branches = []
  }
  
  private selectAll(control: string): void {
    switch (control) {
      case 'Location':
        this.selectedLocation = ['All'];
        break;
      case 'City':
        this.selectedCities = ['All'];
        break;
      case 'Restaurant Name':
        this.selectedRestaurant = ['All'];
        break;
      case 'Region':
        this.selectedRegions = ['All'];
        break;
    }
  }
  
  private removeAllIfPresent(control: string): void {
    const filterAll = (items: string[]): string[] =>
      items.filter(item => item !== 'All');
  
    switch (control) {
      case 'Location':
        this.selectedLocation = this.filterAndUpdate(this.selectedLocation, filterAll);
        break;
      case 'City':
        this.selectedCities = this.filterAndUpdate(this.selectedCities, filterAll);
        break;
      case 'Restaurant Name':
        this.selectedRestaurant = this.filterAndUpdate(this.selectedRestaurant, filterAll);
        break;
      case 'Region':
        this.selectedRegions = this.filterAndUpdate(this.selectedRegions, filterAll);
        break;
    }
  }
  
  private filterAndUpdate(items: string[], filterFn: (items: string[]) => string[]): string[] {
    const filtered = filterFn(items);
    return filtered.length > 0 ? filtered : items;
  }
  
  onDeSelect(event: any, control: string): void{
    if(event == 'All'){
      if(control == 'Location'){
        // this.selectedLocation = [];
      }
    }
  }


  // for getting filter data for sync menu filter 
  getFilterData():void{
    this.isLoading = true;
    this.commonService.getSyncMenuFilterData().subscribe({
      next : (response : FilterDropDataInterface)=>{
        this.isLoading = false;
        this.filterDropData = response as unknown as FilterDropDataInterface
        console.log(this.filterDropData)
        if(this.filterDropData){
          this.filteredOutletsArray = this.filterDropData.data.outlets.map(item => item.ShopName);
          this.filteredRegionsArray = this.filterDropData.data.regions.map(item => item.Region);
        }
        console.log(this.filterDropData)
     },
      error : (error : CustomError)=>{
        console.log(error)
      }
    })
  }
  // selectShopCode(selectedShopCode:string[]):void{
  //   // this.filter.emit(selectedShopCode)
  //   this.shopCodeChange.emit(selectedShopCode)
  // }


  DateChangeEmit(newSelectedData : Date){
    this.DateChange.emit(newSelectedData)
  }


  refreshOrdersEmit():void{
    this.refreshOrders.emit()
  }

  // Below function is use to call add item function in the parent component 
  addItem():void{
    this.addItemEmit.emit()
  }

  createOutlet():void{
    this.outletCreate.emit();
  }
}

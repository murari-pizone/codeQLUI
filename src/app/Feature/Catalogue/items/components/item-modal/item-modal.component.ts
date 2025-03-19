import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { AppLoggerModule } from '../../../../../Core/logger.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BasicInformationTabComponent } from "../item-Modal-tabs/basic-information-tab/basic-information-tab.component";
import { ImageTabComponent } from "../item-Modal-tabs/image-tab/image-tab.component";
import { ShowItemModalTabPipe } from '../../../../../Shared/pipes/show-item-modal-tab.pipe';
import { ItemLocationsComponent } from '../item-Modal-tabs/item-locations/item-locations.component';
import { ItemTabPlatformComponent } from '../item-Modal-tabs/item-tab-platform/item-tab-platform.component';
import { TaxesChargesTabComponent } from '../item-Modal-tabs/taxes-charges-tab/taxes-charges-tab.component';
import { RecommendedItemsTabComponent } from '../item-Modal-tabs/recommended-items-tab/recommended-items-tab.component';
import { CustomFieldTabComponent } from '../item-Modal-tabs/custom-field-tab/custom-field-tab.component';
import { ItemGroupsTabComponent } from '../item-Modal-tabs/item-groups-tab/item-groups-tab.component';
import { ModifierGroupTabComponent } from '../item-Modal-tabs/modifier-group-tab/modifier-group-tab.component';
import { ItemsRowData } from '../../interface/items.interface';
import { ItemModalLogicService } from './item-modal.logic.service';
import * as bootstrap from 'bootstrap'
@Component({
  selector: 'app-item-modal',
  standalone: true,
  imports: [AppLoggerModule, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, FormsModule, MatSortModule, MatButtonModule, MatMenuModule, BasicInformationTabComponent, ImageTabComponent, ShowItemModalTabPipe,
    ItemLocationsComponent, ItemTabPlatformComponent,TaxesChargesTabComponent,RecommendedItemsTabComponent, CustomFieldTabComponent,ItemGroupsTabComponent,ModifierGroupTabComponent
  ],
  templateUrl: './item-modal.component.html',
  styleUrl: './item-modal.component.scss',
  providers : [ItemModalLogicService]
})
export class ItemModalComponent {
  
  @ViewChild('EditItem') editItemOffcanvas!: ElementRef; 
  @ViewChild(BasicInformationTabComponent) BasicInformationTab!: BasicInformationTabComponent; 
  @Input() showSideBar : boolean = false;
  @Input() isCreateItem : boolean = false;
  @Input() currentRow! : ItemsRowData;
  showTab:number = 1;
  currentStep : string = 'Basic Information';
  preview!: string;
  @Output() closeSideBar = new EventEmitter<string>()
  @Output() SaveItemEmit = new EventEmitter<ItemsRowData>()
  drawerWidth = 900;
  isResizing = false;
  startWidth = 0;
  startX = 0; 
  minWidth = 800;
  maxWidth = 1600;
  tabWidth = 150;
  totalTabs = 9; 
  visibleTabs: number = 4;
  tabMinWidth = 150;
  tabMaxWidth = 200;
  startsWith = 0;
  endWith = 0;
  currentTabIndex: number = 0;

  constructor(public logicService : ItemModalLogicService){

  }
  // Update visible tabs based on drawer width
  updateVisibleTabs(): void {
    const tabWidth = this.tabMaxWidth; // Use max-width for calculation
    this.visibleTabs = Math.floor(this.drawerWidth / tabWidth);
  }

  tabs = [
    { name: 'Basic Information', label: 'Basic Information' },
    { name: 'Images', label: 'Images' },
    { name: 'Item Groups', label: 'Item Groups' },
    { name: 'Taxes & Charges', label: 'Taxes & Charges' },
    
    { name: 'Location', label: 'Location' },
    { name: 'PlatForms', label: 'PlatForms' },
    { name: 'Modifier Groups', label: 'Modifier Groups' },
    { name: 'Recommended Items', label: 'Recommended Items' },
    { name: 'Custom Fields', label: 'Custom Fields' },
  ];
  
  getVisibleTabs(): any[] {
    return this.tabs.slice(this.currentTabIndex, this.currentTabIndex + this.visibleTabs);
  }

  // when click on cross icon of Modal
  closeSideBarEmit():void{
    
    this.currentStep = 'Basic Information'
    this.closeSideBar.emit()
  }
  
  // Show previous tab
  showPreviousTab(): void {
    this.currentTabIndex = Math.max(0, this.currentTabIndex - this.visibleTabs);
  }

  // Show next tab
  showNextTab(): void {
    const maxIndex = Math.max(0, this.tabs.length - this.visibleTabs);
    this.currentTabIndex = Math.min(this.currentTabIndex + this.visibleTabs, maxIndex);
  }

  empty():void{
    console.log('')
  }


  // When resizing the modal
  onMouseDown(event: MouseEvent | TouchEvent): void {
    this.isResizing = true;
    this.startWidth = this.drawerWidth;
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent): void {
    if (!this.isResizing) return;
    const currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const deltaX = this.startX - currentX;
    this.drawerWidth = Math.max(this.minWidth, Math.min(this.startWidth + deltaX, this.maxWidth));
    this.updateVisibleTabs();
  }

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])
  onMouseUp(): void {
    this.isResizing = false;
  }
  // Modal drag logic ends


  // Provide offCampus in Parent component so that User can open it from parent component
  getEditItemElement(): ElementRef {
    console.log(this.currentRow)
    if (!this.editItemOffcanvas) {
      throw new Error('EditItem element not found!');
    }
    return this.editItemOffcanvas;
  }

  // when click on save button new item
  onSaveItem():void{
    if(this.BasicInformationTab){
        const errorMessage = this.logicService.isRowValid(this.BasicInformationTab.currentRow)
        if(errorMessage && errorMessage.length > 0){
          console.log(errorMessage)
          this.BasicInformationTab.errorMessage = errorMessage;
        }else{
          const editItemElement = this.getEditItemElement();
          if(editItemElement){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const offcanvas = new bootstrap.Offcanvas(editItemElement.nativeElement);
            offcanvas.hide();
          }
          this.SaveItemEmit.emit(this.BasicInformationTab.currentRow)
        }
    }
  }
}

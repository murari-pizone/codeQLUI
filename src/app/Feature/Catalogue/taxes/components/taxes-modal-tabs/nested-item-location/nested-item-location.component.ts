import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ItemAndLocation } from '../../../interface/taxes-interface';
import { ShowItemModalTabPipe } from '../../../../../../Shared/pipes/show-item-modal-tab.pipe';
import { CommonModule } from '@angular/common';
import { BasicInformationTabComponent } from '../../../../items/components/item-Modal-tabs/basic-information-tab/basic-information-tab.component';
import { ModifierGroupItemsTabComponent } from '../../../../modifier-group/components/modifier-group-tabs/modifier-group-items-tab/modifier-group-items-tab.component';

@Component({
  selector: 'app-nested-item-location',
  standalone: true,
  imports: [ShowItemModalTabPipe, CommonModule, BasicInformationTabComponent, ModifierGroupItemsTabComponent],
  templateUrl: './nested-item-location.component.html',
  styleUrl: './nested-item-location.component.scss'
})
export class NestedItemLocationComponent {
  @ViewChild('ItemLocationNest') itemLocationNest!: ElementRef;
  @Input() showSideBar: boolean = false;
  @Input() currentRow: ItemAndLocation[] = [];
  @Output() closeSideBar = new EventEmitter<string>()

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
  currentStep: string = 'Basic Information';
  currentTabIndex: number = 0;
  tabs = [
    { name: 'Basic Information', label: 'Basic Information' },
    { name: 'Items', label: 'Items' },
  ];

  constructor(){
    console.log('currentRow',this.currentRow)
  }
  
  

   // When resizing the modal
   onMouseDown(event: MouseEvent | TouchEvent): void {
    this.isResizing = true;
    this.startWidth = this.drawerWidth;
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    event.preventDefault();
  }

   // Provide offCampus in Parent component so that User can open it from parent component
   getItemLocationNest(): ElementRef {
    if (!this.itemLocationNest) {
      throw new Error('EditItem element not found!');
    }
    return this.itemLocationNest;
  }

   // when click on cross icon of Modal
   closeSideBarEmit(): void {
    this.currentStep = 'Basic Information'
    this.closeSideBar.emit()
  }

    @HostListener('document:mousemove', ['$event'])
    @HostListener('document:touchmove', ['$event'])
    onMouseMove(event: MouseEvent | TouchEvent): void {
      if (!this.isResizing) return;
      const currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      const deltaX = this.startX - currentX;
      this.drawerWidth = Math.max(this.minWidth, Math.min(this.startWidth + deltaX, this.maxWidth));
    }
  
    @HostListener('document:mouseup', ['$event'])
    @HostListener('document:touchend', ['$event'])
    onMouseUp(): void {
      this.isResizing = false;
    }

    empty():void{
      console.log('empty');
    }
}
 
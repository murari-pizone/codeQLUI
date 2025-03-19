import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AppLoggerModule } from '../../../../../Core/logger.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ShowItemModalTabPipe } from '../../../../../Shared/pipes/show-item-modal-tab.pipe';
import { NestedModifierComponent } from '../modifier-group-tabs/nested-modifier/nested-modifier.component';
import { ModifierGroupItemsTabComponent } from '../modifier-group-tabs/modifier-group-items-tab/modifier-group-items-tab.component';
import { BasicInformationTabComponent } from '../../../items/components/item-Modal-tabs/basic-information-tab/basic-information-tab.component';

@Component({
  selector: 'app-modifier-group-modal',
  standalone: true,
  imports: [AppLoggerModule, CommonModule, MatTableModule, MatPaginatorModule, NgxPaginationModule, FormsModule, MatSortModule, MatButtonModule, MatMenuModule, BasicInformationTabComponent,ShowItemModalTabPipe,
      NestedModifierComponent , ModifierGroupItemsTabComponent , 
    ],
  templateUrl: './modifier-group-modal.component.html',
  styleUrl: './modifier-group-modal.component.scss'
})
export class ModifierGroupModalComponent {
  @Input() showSideBar : boolean = false;
  showTab:number = 1;
  currentStep : string = 'Basic Information';
  preview!: string;
  @Output() closeSideBar = new EventEmitter<string>()
  drawerWidth = 1200;
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

  // Update visible tabs based on drawer width
  updateVisibleTabs(): void {
    const tabWidth = this.tabMaxWidth; // Use max-width for calculation
    this.visibleTabs = Math.floor(this.drawerWidth / tabWidth);
  }

  tabs = [
    { name: 'Basic Information', label: 'Basic Information' },
    { name: 'Items', label: 'Items' },
    { name: 'Nested Modifier', label: 'Nested Modifier' },
   
  ];
  
  getVisibleTabs(): any[] {
    return this.tabs.slice(this.currentTabIndex, this.currentTabIndex + this.visibleTabs);
  }

  // when click on cross icon of Modal
  closeSideBarEmit():void{
    this.currentStep = 'Basic Information'
    this.closeSideBar.emit()
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
}

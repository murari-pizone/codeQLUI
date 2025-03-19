import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ShowItemModalTabPipe } from "../../../../../Shared/pipes/show-item-modal-tab.pipe";
import { CommonModule } from '@angular/common';
import { ModifiersTabBasicInfoComponent } from '../modifiers-tabs/modifiers-tab-basic-info/modifiers-tab-basic-info.component';
import { ModifiersTabImagesComponent } from '../modifiers-tabs/modifiers-tab-images/modifiers-tab-images.component';
import { ModifiersTabLocationsComponent } from '../modifiers-tabs/modifiers-tab-locations/modifiers-tab-locations.component';
import { ModifiersTabParentGroupsComponent } from '../modifiers-tabs/modifiers-tab-parent-groups/modifiers-tab-parent-groups.component';

@Component({
  selector: 'app-modifiers-modal',
  standalone: true,
  imports: [ShowItemModalTabPipe, CommonModule, ModifiersTabBasicInfoComponent,ModifiersTabImagesComponent,ModifiersTabLocationsComponent,ModifiersTabParentGroupsComponent],
  templateUrl: './modifiers-modal.component.html',
  styleUrl: './modifiers-modal.component.scss'
})
export class ModifiersModalComponent {

  @Input() showSideBar: boolean = false;
  showTab: number = 1;
  currentStep: string = 'Parent Modifier Groups';
  preview!: string;
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
  currentTabIndex: number = 0;

  tabs = [
    
    { name: 'Parent Modifier Groups', label: 'Parent Modifier Groups' },
    { name: 'Basic Information', label: 'Basic Information' },
    { name: 'Images', label: 'Images' },
    { name: 'Locations', label: 'Locations' },

    { name: 'Nested Modifier Groups', label: 'Nested Modifier Groups' },
    { name: 'PlatForms', label: 'PlatForms' },
    { name: 'Modifier Groups', label: 'Modifier Groups' },
    { name: 'Recommended Items', label: 'Recommended Items' },
    { name: 'Custom Fields', label: 'Custom Fields' },
  ];

  // when click on cross icon of Modal
  closeSideBarEmit(): void {
    this.currentStep = 'Basic Information'
    this.closeSideBar.emit()
  }

  // Show previous tab
  showPreviousTab(): void {
    this.currentTabIndex = Math.max(0, this.currentTabIndex - this.visibleTabs);
  }

  empty(): void {
    console.log('empty')
  }

  // Show next tab
  showNextTab(): void {
    const maxIndex = Math.max(0, this.tabs.length - this.visibleTabs);
    this.currentTabIndex = Math.min(this.currentTabIndex + this.visibleTabs, maxIndex);
  }

  // When resizing the modal
  onMouseDown(event: MouseEvent | TouchEvent): void {
    this.isResizing = true;
    this.startWidth = this.drawerWidth;
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    event.preventDefault();
  }

  // Update visible tabs based on drawer width
  updateVisibleTabs(): void {
    const tabWidth = this.tabMaxWidth; // Use max-width for calculation
    this.visibleTabs = Math.floor(this.drawerWidth / tabWidth);
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

}

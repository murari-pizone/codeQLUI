import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tags-modal',
  standalone: true,
  imports: [],
  templateUrl: './tags-modal.component.html',
  styleUrl: './tags-modal.component.scss'
})
export class TagsModalComponent {

  @Input() showSideBar: boolean = false;

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

  // When resizing the modal
  onMouseDown(event: MouseEvent | TouchEvent): void {
    this.isResizing = true;
    this.startWidth = this.drawerWidth;
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    event.preventDefault();
  }

  // when click on cross icon of Modal
  closeSideBarEmit(): void {
    this.closeSideBar.emit()
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

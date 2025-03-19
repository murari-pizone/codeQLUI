import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from '../../../../Shared/filter/filter.component';
import { CategoryConst } from '../const/category.const';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../interface/category.interface';
import cloneDeep from 'lodash-es/cloneDeep';
import { SortDataBuilder } from './category-logic.service';
import { SubCategoryComponent } from '../sub-category/sub-category.component';
import { TabBaseInfoComponent } from '../sub-category/sub-category-tabs/tab-base-info/tab-base-info.component';
import { TabAssoItemsComponent } from '../sub-category/sub-category-tabs/tab-asso-items/tab-asso-items.component';
import { TabSubCategoryComponent } from '../sub-category/sub-category-tabs/tab-sub-category/tab-sub-category.component';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterComponent,
    SubCategoryComponent, TabBaseInfoComponent, TabAssoItemsComponent, TabSubCategoryComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  providers: [CategoryConst],
})
export class CategoryComponent implements OnInit {
  constructor(
    public readonly catConst: CategoryConst,
    readonly popup: MatDialog
  ) {
    this.catConst.categories.forEach((item: Category, index: number) => {
      item.id = this.generateGuid();
      this.catConst.subcategories[index]['categoryId'] = item.id;
    });
    console.log(this.catConst);
  }

  status: string = this.catConst.active;
  currentStep: string = this.catConst.Basic_Information;
  subCatIndex: number = 0;
  catIndex: number = 0;
  subCatId: string = '';
  isExpanded: boolean = false;
  cloneCatData: Category[] = [];
  @ViewChild('EditCategory', { static: true }) EditCategory!: ElementRef;
  drawerWidth = 900; // Initial width of the drawer
  isResizing = false;
  startWidth = 0; // Drawer width when resizing starts
  startX = 0; // X-coordinate when resizing starts
  minWidth = 800;
  maxWidth = 1600;

  ngOnInit(): void {
    this.cloneCatData = cloneDeep(this.catConst.categories);
    this.selectCategory(this.catConst.categories[0])
  }
  generateGuid(): string {
    return crypto.randomUUID();
  }

  onStatusChange(event: Event): void {
    this.status = (event.target as HTMLSelectElement).value;
  }

  selectCategory(category: Category): void {
    const { subCatIndex, catIndex, subCatId } = SortDataBuilder.selectCategory(
      category,
      this.catConst.categories,
      this.catConst.subcategories
    );
    this.subCatIndex = subCatIndex;
    this.catIndex = catIndex;
    this.subCatId = subCatId;
  }
  empty(): void {
    console.log('empty');
  }

  // filter the data on based on input
  filterInputData(event: string): void {
    const { subCatIndex, catIndex } = SortDataBuilder.filterInputData(event, this.cloneCatData, this.catConst.categories, this.subCatId, this.catConst.subcategories);
    this.subCatIndex = subCatIndex;
    this.catIndex = catIndex;
  }
  submitFilter(event: any): void {
    event;
  }
  resetFilter(event: any): void {
    event;
  }
  resetModelValues(): void {
    this.catConst.editCategory = [];
    this.currentStep = 'Basic Information';
    this.drawerWidth = 900;
  }
  setEditCategory(subcategory: any): void {
    this.currentStep = 'Basic Information';
    this.catConst.editCategory = this.catConst.subcategories[
      this.subCatIndex
    ].subCategoryItems.filter((item: any) => {
      return item == subcategory;
    });
  }

  updateStatus(state: string): void {
    if (state === 'Active') {
      this.catConst.editCategory[0].status = 'InActive';
      this.removeDrawer();
    } else {
      this.catConst.editCategory[0].status = 'Active';
      this.removeDrawer();
    }
  }

  removeDrawer(): void {
    SortDataBuilder.removeDrawer(this.EditCategory as ElementRef<HTMLElement>);
  }

  // Modal drag logic starts
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
  }

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])

  onMouseUp(): void {
    this.isResizing = false;
  }
  // Modal drag logic ends

}

import { Sort } from "@angular/material/sort";
import { AssociateItem, Category, SubCategory } from "../interface/category.interface";
import { Offcanvas } from "bootstrap";
import { ElementRef } from "@angular/core";
import { cloneDeep } from "lodash-es";

export class SortDataBuilder {
  static getSortedData(data: AssociateItem[], sort: Sort): AssociateItem[] {
    const isAsc = sort.direction === 'asc';
    return data
      .map((item) => item) // Create a shallow copy without modifying the original array
      .sort((a: AssociateItem, b: AssociateItem) => {
        switch (sort.active) {
          case 'Name':
            return this.compare<string>(a?.itemName, b?.itemName, isAsc);
          case 'assoLocation':
            return this.compare<number>(a?.assoLocation, b?.assoLocation, isAsc);
          case 'assoBrand':
            return this.compare<string>(a?.assoBrand, b?.assoBrand, isAsc);
          case 'price':
            return this.compare<number>(a?.price, b?.price, isAsc);
          default:
            return 0;
        }
      });
  }
  static compare<T>(a: T, b: T, isAsc: boolean): number {
    if (a < b) return isAsc ? -1 : 1;
    if (a > b) return isAsc ? 1 : -1;
    return 0;
  }

  static removeDrawer(EditCategory: ElementRef<HTMLElement>): void {
    const offcanvasElement = EditCategory?.nativeElement;
    let offcanvasInstance: Offcanvas | null =
      Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance === null) {
      offcanvasInstance = new Offcanvas(offcanvasElement);
    }
    if (offcanvasInstance instanceof Offcanvas) {
      offcanvasInstance.hide();
    }
    offcanvasElement.classList.remove('show');
    const backdrop = document.querySelector('.offcanvas-backdrop');
    if (backdrop instanceof HTMLElement) {
      backdrop.remove();
    }
  }
  static selectCategory(category: Category, constCategories: Category[], constSubcategories: SubCategory[]): { subCatIndex: number; catIndex: number; subCatId: string } {
    // Update selected category and index
    const selectedCategory = constCategories.find(
      (item: Category) => item.id === category.id
    );
    constCategories.forEach(
      (item) => (item.isSelected = item.id === category.id)
    );
    let catIndex = -1;
    let subCatId = '';
    if (selectedCategory) {
      catIndex = constCategories.indexOf(selectedCategory);
      subCatId = selectedCategory.id;
    }

    // Update selected subcategory index
    const selectedSubcategory = constSubcategories.find(
      (item: SubCategory) => item.categoryId === category.id
    );
    const subCatIndex = selectedSubcategory
      ? constSubcategories.indexOf(selectedSubcategory)
      : -1;
    return { subCatIndex, catIndex, subCatId };
  }

  static filterInputData( event: string, cloneCatData: Category[], categories: Category[], subCatId: string, constSubcategories: SubCategory[] ): { subCatIndex: number; catIndex: number } {
    const filterData = cloneCatData.filter((item: Category) => {
      return item.name.toLowerCase().includes(event.toLowerCase());
    });
    let catIndex = -1;
    let subCatIndex = -1;
    const updatedCategories = cloneDeep(filterData);
    updatedCategories.forEach((item: Category, index: number) => {
      item.isSelected = item.id === subCatId;
      if (item.id === subCatId) {
        catIndex = index;
      }
    });
    constSubcategories.forEach((item: SubCategory, index: number) => {
      if (item.categoryId === subCatId) {
        subCatIndex = index;
      }
    });
    categories.length = 0; // Clear the existing array
    categories.push(...updatedCategories);
    return { subCatIndex, catIndex };
  }
}
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoryConst } from '../const/category.const';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss'
})
export class SubCategoryComponent {

  @Input() subCatIndex: number = 0;
  @Input() catIndex: number = 0;
  @Input() currentStep: string = 'Basic Information';

  constructor(public readonly catConst: CategoryConst) {

  }

  empty(): void {
    console.log('empty')
  }

  setEditCategory(subcategory: any): void {
    this.currentStep = 'Basic Information';
    this.catConst.editCategory = this.catConst.subcategories[
      this.subCatIndex
    ].subCategoryItems.filter((item: any) => {
      return item == subcategory;
    });
  }

  checkSubCatInd(): boolean {
    const categories = this.catConst.categories;
    const subcategories = this.catConst.subcategories;

    const isValid =
      categories?.length &&
      subcategories?.[this.subCatIndex]?.subCategoryItems?.length &&
      categories[this.catIndex]?.isSelected;

    return !!isValid;
  }
}

export interface Category {
  id: string;
  name: string;
  isSelected?: boolean;
}
export interface SubCatDetail {
  name: string;
  sortOrder: number;
  pCategory: string;
  associatedItems: AssociateItem[];
  status:string;
}
export interface AssociateItem {
  itemName: string;
  assoLocation: number;
  assoBrand: string;
  price: number;
}
export interface SubCategory {
  id: string;
  categoryId:string;
  subCategoryItems: SubCatDetail[];
}

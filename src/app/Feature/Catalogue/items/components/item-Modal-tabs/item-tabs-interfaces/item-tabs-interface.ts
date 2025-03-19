export interface ItemLocationData {
  locationName: string;
  locationTitle: string;
  availability: boolean;
  stockCount: number;
  merakiPrice: number;
  hubPrice: number;
}
export interface ItemRecommendationData {
  id?: string;
  title: string;
  category: string;
  price: number;
}

export interface CustomField {
  id?: string;
  groupTitle: string;
  groupFields: GroupFields[]
}
export interface GroupFields {
  fieldName: string;
  fieldValue: number;
  id?: string;
}

export interface ItemAssociated {
  id?: string;
  name: string;
  itemAssociated: number
}
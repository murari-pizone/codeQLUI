export interface AggregatorStatus {
  active: string[];
  archive: string[];
}

export interface TagsItem {
  srNo: number;
  tagsName: string;
  assoItems: number;
  assoModi: number;
}

export class TagsListPage {
  itemPerPage: number = 10;
  totalItems: number = 0
  pageNumber: number = 1;
}
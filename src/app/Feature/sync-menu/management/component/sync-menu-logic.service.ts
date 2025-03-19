import { Sort } from "@angular/material/sort";
import { EntityResponse, FetchDataJson, MenuRows, SyncMenuFilterData } from "../interface/sync-menu-interface";
import { SyncMenuConstant } from "../const/sync-menu.const";

export class SyncMenuLogic {

  static sortData(sort: Sort, rows: MenuRows[], previousSortDirection: string): { rows: MenuRows[]; previousSortDirection: string } {
    const data = rows.slice();
    if (sort.direction === '') {
      sort.direction = previousSortDirection == 'asc' ? 'desc' : 'asc';
    } else if (previousSortDirection == sort.direction) {
      sort.direction = sort.direction === 'asc' ? 'desc' : 'asc';
    }
    const sortedArray = this.sortingLogic(data, sort);
    rows = sortedArray;
    previousSortDirection = sort.direction;
    return { rows, previousSortDirection };
  }

  static sortingLogic(data: MenuRows[], sort: Sort): MenuRows[] {
    return this.getSortedData(data, sort);
  }

  static getSortedData(data: MenuRows[], sort: Sort): MenuRows[] {
    const isAsc = sort.direction === SyncMenuConstant.asc;
    return data
      .map((item) => item) // Create a shallow copy without modifying the original array
      .sort((a, b) => {
        switch (sort.active) {
          case SyncMenuConstant.Sr_No:
            return this.compare<string>(a?.brcode, b?.brcode, isAsc);
          case SyncMenuConstant.Restaurant_Name:
            return this.compare<string>(a?.brname, b?.brname, isAsc);
          case SyncMenuConstant.Location:
            return this.compare<string>(a?.Add1, b?.Add1, isAsc);
          case SyncMenuConstant.City:
            return this.compare<string>(a?.StateName, b?.StateName, isAsc);
          case SyncMenuConstant.Status:
            return this.compare<string>(a?.Status, b?.Status, isAsc);
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

  static handleSingleSelection(isAllSelected: boolean, selectedRows: MenuRows[], rows: MenuRows[], allData: MenuRows[], selectedRow: MenuRows, isChecked: boolean): { selectedRows: MenuRows[]; isAllSelected: boolean, rows: MenuRows[] } {
    const rowIndex = allData.findIndex(
      (item) => item?.brname === selectedRow?.brname
    );
    if (rowIndex === -1) {
      return { selectedRows: selectedRows, isAllSelected: isAllSelected, rows: rows };
    }

    rows[rowIndex].isChecked = isChecked;

    if (isChecked) {
      selectedRows.push(rows[rowIndex]);
    } else {
      selectedRows = selectedRows.filter((item) => item.brcode !== selectedRow.brcode);
    }

    isAllSelected = selectedRows.length === allData.length;

    return { selectedRows: selectedRows, isAllSelected: isAllSelected, rows: rows };
  }

  static setFilterData(event: SyncMenuFilterData, syncMenuDataLists: SyncMenuFilterData): { modifiedEvent: SyncMenuFilterData } {
    if (event.outlet_location.length == 1 && event.outlet_location[0] == 'All') {
      const filteredData = syncMenuDataLists.outlet_location.filter(item => { return item != 'All' });
      event.outlet_location = filteredData;
    }
    if (event.outlet_city.length == 1 && event.outlet_city[0] == 'All') {
      const filteredData = syncMenuDataLists.outlet_city.filter(item => { return item != 'All' });
      event.outlet_city = filteredData;
    }
    if (event.outlet_region.length == 1 && event.outlet_region[0] == 'All') {
      const filteredData = syncMenuDataLists.outlet_region.filter(item => { return item != 'All' });
      event.outlet_region = filteredData;
    }
    return { modifiedEvent:event }
  }

  static extractFields(data: Record<string, EntityResponse>): Array<EntityResponse> {
    const result: Array<EntityResponse> = [];

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const items: EntityResponse = data[key];
        if (Array.isArray(items)) {
          items.forEach((item:EntityResponse) => {
            result.push({
              request_id: item.request_id,
              entity_type: item.entity_type,
              external_entity_id: item.external_entity_id,
              external_message: item.external_message,
              status: item.status.replaceAll('_',' ') ,
              time: item.time,
              isShowComplexColumn: true // Add this dynamically
            });
          });
        }
      }
    }
    result.forEach((item: EntityResponse, index: number) => {
      item['srNo'] = index + 1;
      item['isShowComplexColumn'] = false;
    })
    return result;
  }
}

export class SyncMenuJsonMaker {
  static makeGroupOfId(selectedRows: MenuRows[]): FetchDataJson[] {
    return selectedRows.map(item => {
      return {
        "id": item.id,
        "ShopCode": item?.brcode,
        "Region": item?.Region
      }
    })
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showItemModalTab',
  standalone: true
})
export class ShowItemModalTabPipe implements PipeTransform {
  transform(tabs: any[], startIndex: number, count: number): any[] {
    if (!tabs || tabs.length === 0 || count <= 0) {
      return [];
    }
    return tabs.slice(startIndex, startIndex + count);
  }
}

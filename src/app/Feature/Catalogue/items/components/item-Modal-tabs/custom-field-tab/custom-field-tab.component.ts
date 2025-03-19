import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomField } from '../item-tabs-interfaces/item-tabs-interface';

@Component({
  selector: 'app-custom-field-tab',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './custom-field-tab.component.html',
  styleUrl: './custom-field-tab.component.scss'
})
export class CustomFieldTabComponent {

  customFieldGroups: CustomField[] = [];

  constructor() {
    if (this.customFieldGroups.length == 0) {
      this.customFieldGroups.splice(0, 0, { groupTitle: '', groupFields: [{ fieldName: '', fieldValue: 0, id: '' }], id: '' })
    }
  }

  // adding group
  addGroup(): void {
    this.customFieldGroups.splice(0, 0, { groupTitle: '', groupFields: [{ fieldName: '', fieldValue: 0, id: '' }], id: '' })
  }

  // adding fields in the group
  addGroupField(index: number): void {
    this.customFieldGroups[index].groupFields.splice(0, 0, { fieldName: '', fieldValue: 0, id: '' })
  }

  // removing complete group
  removeGroup(ind: number): void {
    this.customFieldGroups.splice(ind, 1);
  }

  // removing group field by index
  removeGroupField(groupInd: number, fieldInd: number): void {
    this.customFieldGroups[groupInd].groupFields.splice(fieldInd, 1)
  }
  empty(): void { }
}

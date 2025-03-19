import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemAssociated } from '../item-tabs-interfaces/item-tabs-interface';

@Component({
  selector: 'app-item-groups-tab',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item-groups-tab.component.html',
  styleUrl: './item-groups-tab.component.scss'
})
export class ItemGroupsTabComponent {

  itemAssociated: ItemAssociated[] = [];

  constructor() {
    this.itemAssociated = [
      { name: 'All', itemAssociated: 427 },
      { name: '5% GST', itemAssociated: 280 }
    ]
  }
}

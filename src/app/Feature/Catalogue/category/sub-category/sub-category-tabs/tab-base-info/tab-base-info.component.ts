import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryConst } from '../../../const/category.const';

@Component({
  selector: 'app-tab-base-info',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tab-base-info.component.html',
  styleUrl: './tab-base-info.component.scss'
})
export class TabBaseInfoComponent {

  @Input()isExpanded:boolean=false;

  constructor(public readonly catConst: CategoryConst){

  }

  setParentCategory(name: string): void {
    console.log('name', name);
  }

  toggleState(): void {
    this.isExpanded = !this.isExpanded;
  }

  empty():void{
    console.log('empty')
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ItemsRowData } from '../../../interface/items.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { itemsConstant } from '../../../const/items.constant';

@Component({
  selector: 'app-basic-information-tab',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './basic-information-tab.component.html',
  styleUrl: './basic-information-tab.component.scss',
  providers : [itemsConstant]
})
export class BasicInformationTabComponent implements OnInit {

  @Input() From! : string;
  @Input() isCreateItem! : boolean;
  @Input() currentRow! : ItemsRowData;

  errorMessage : string[] = []
  // lists 

  listOfVariants = this.constant.listOfVariants;
  foodTypeList = this.constant.foodTypeList;
  categoryList = this.constant.categoryList;
  
  constructor(public constant : itemsConstant){}
  ngOnInit():void{
    console.log(this.currentRow)
  }

  onCheckIsRecommended(check?:boolean):void{
    this.currentRow.isRecommended = !check
  }
  onCheckMarkedAddOn(check?:boolean):void{
    this.currentRow.marked_as_add_on = !check
  }
  empty():void{
    console.log('')
  }
  clearErrorMessage():void{
    this.errorMessage = []
  }
  value:string='e333'
}

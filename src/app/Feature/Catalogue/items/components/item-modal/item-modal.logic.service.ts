import { ItemsRowData } from "../../interface/items.interface";

export class ItemModalLogicService {
  isRowValid(row : ItemsRowData):string[]{
    const errorMessage = []
    if(row){
        if (row.Items_title?.trim() === '') {
            errorMessage.push('Title is required');
        }
        if(row.modifier_group_type?.trim() === ''){
            errorMessage.push('Modifier group is required')
        }
        if(row.Category?.trim() === ''){
          errorMessage.push('Category  is required')
        }
        if(row.food_type?.trim() === ''){
          errorMessage.push('food_type is required')
        }
        if(row.sort_order && row.sort_order?.trim() === ''){
          errorMessage.push('sort_order is required')
        }
      }
      return errorMessage
    }
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IGetAllItems } from './item-service.interface';
import { ItemsRowData } from '../../interface/items.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemsService implements IGetAllItems {
   rows : ItemsRowData[] = []
   constructor(){
       this.rows = [
        {
          "Items": "Pizza",
          "CRM_Title": "Margherita Pizza",
          "Category": "Fast-food",
          "postalCode": 12345,
          "Items_title": "Classic Margherita",
          "modifier_group_type": "500gm",
          "food_type": "Vegetarian",
          "sort_order": "1",
          "isRecommended": true,
          "default_sales_price": 8.99,
          "markup_price": 10.99,
          "marked_as_add_on": false
        },
        {
          "Items": "Burger",
          "CRM_Title": "Cheeseburger",
          "Category": "Fast-food",
          "postalCode": 67890,
          "Items_title": "Deluxe Cheeseburger",
          "modifier_group_type": "250gm",
          "food_type": "Non-Vegetarian",
          "sort_order": "2",
          "isRecommended": true,
          "default_sales_price": 6.99,
          "markup_price": 8.49,
          "marked_as_add_on": true
        },
        {
          "Items": "Pasta",
          "CRM_Title": "Alfredo Pasta",
          "Category": "Chaines",
          "postalCode": 11223,
          "Items_title": "Creamy Alfredo Pasta",
          "modifier_group_type": "1kg",
          "food_type": "Vegetarian",
          "sort_order": "3",
          "isRecommended": false,
          "default_sales_price": 7.49,
          "markup_price": 9.49,
          "marked_as_add_on": false
        },
        {
          "Items": "Salad",
          "CRM_Title": "Caesar Salad",
          "Category": "Fruit",
          "postalCode": 33445,
          "Items_title": "Classic Caesar Salad",
          "modifier_group_type": "500gm",
          "food_type": "Vegetarian",
          "sort_order": "4",
          "isRecommended": true,
          "default_sales_price": 5.49,
          "markup_price": 6.99,
          "marked_as_add_on": true
        },
        {
          "Items": "Sushi",
          "CRM_Title": "California Roll",
          "Category": "Chaines",
          "postalCode": 55678,
          "Items_title": "Fresh California Roll",
          "modifier_group_type": "250gm",
          "food_type": "Non-Vegetarian",
          "sort_order": "5",
          "isRecommended": false,
          "default_sales_price": 12.99,
          "markup_price": 14.99,
          "marked_as_add_on": false
        },
        {
          "Items": "Sandwich",
          "CRM_Title": "Club Sandwich",
          "Category": "Bread",
          "postalCode": 98765,
          "Items_title": "Double Layer Club",
          "modifier_group_type": "1kg",
          "food_type": "Non-Vegetarian",
          "sort_order": "6",
          "isRecommended": true,
          "default_sales_price": 6.99,
          "markup_price": 8.49,
          "marked_as_add_on": true
        },
        {
          "Items": "Soup",
          "CRM_Title": "Tomato Soup",
          "Category": "Fruit",
          "postalCode": 22334,
          "Items_title": "Creamy Tomato Soup",
          "modifier_group_type": "250gm",
          "food_type": "Vegetarian",
          "sort_order": "7",
          "isRecommended": false,
          "default_sales_price": 4.99,
          "markup_price": 5.99,
          "marked_as_add_on": false
        },
        {
          "Items": "Steak",
          "CRM_Title": "Ribeye Steak",
          "Category": "Chaines",
          "postalCode": 44556,
          "Items_title": "Grilled Ribeye",
          "modifier_group_type": "1kg",
          "food_type": "Non-Vegetarian",
          "sort_order": "8",
          "isRecommended": true,
          "default_sales_price": 18.99,
          "markup_price": 21.99,
          "marked_as_add_on": false
        },
        {
          "Items": "Dessert",
          "CRM_Title": "Chocolate Cake",
          "Category": "Sweets",
          "postalCode": 66778,
          "Items_title": "Rich Chocolate Cake",
          "modifier_group_type": "500gm",
          "food_type": "Vegetarian",
          "sort_order": "9",
          "isRecommended": true,
          "default_sales_price": 5.99,
          "markup_price": 7.49,
          "marked_as_add_on": true
        },
        {
          "Items": "Beverage",
          "CRM_Title": "Lemonade",
          "Category": "Sweets",
          "postalCode": 88990,
          "Items_title": "Fresh Lemonade",
          "modifier_group_type": "250gm",
          "food_type": "Vegetarian",
          "sort_order": "10",
          "isRecommended": false,
          "default_sales_price": 2.99,
          "markup_price": 3.49,
          "marked_as_add_on": false
        }
      ]
      
       
   }

   getAllItems():Observable<ItemsRowData[]>{
      return of(this.rows)
   }
}
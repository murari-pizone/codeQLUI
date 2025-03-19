import { Injectable } from '@angular/core';
import { IGetAllModifiers } from './modifiers-service.interface';
import { Observable, of } from 'rxjs';
import { ModifiersRowData } from '../modifiers-interface/modifiers.interface';

@Injectable({
  providedIn: 'root'
})
export class ModifiersService implements IGetAllModifiers {

  modifiersData: ModifiersRowData[] = [
    { id: '1', title: 'Extra Paneer', crm_title: 'Paneer Add-On', modifier_groups: 'Toppings', locations: 'Mumbai Branch', price: 50 },
    { id: '2', title: 'Butter Topping', crm_title: 'Butter Drizzle', modifier_groups: 'Toppings', locations: 'Delhi Branch', price: 30 },
    { id: '3', title: 'Cheese Burst', crm_title: 'Cheese Add-On', modifier_groups: 'Toppings', locations: 'Bangalore Branch', price: 70 },
    { id: '4', title: 'Extra Masala', crm_title: 'Spice Mix', modifier_groups: 'Condiments', locations: 'Hyderabad Branch', price: 20 },
    { id: '5', title: 'Garlic Naan Upgrade', crm_title: 'Bread Upgrade', modifier_groups: 'Bread Options', locations: 'All Locations', price: 40 },
    { id: '6', title: 'Extra Ghee', crm_title: 'Ghee Topping', modifier_groups: 'Toppings', locations: 'Chennai Branch', price: 35 },
    { id: '7', title: 'Cashew Garnish', crm_title: 'Premium Topping', modifier_groups: 'Toppings', locations: 'Mumbai Branch', price: 60 },
    { id: '8', title: 'Mint Chutney', crm_title: 'Chutney Add-On', modifier_groups: 'Condiments', locations: 'Delhi Branch', price: 25 },
    { id: '9', title: 'Extra Aloo', crm_title: 'Potato Add-On', modifier_groups: 'Toppings', locations: 'Bangalore Branch', price: 40 },
    { id: '10', title: 'Coriander Garnish', crm_title: 'Herb Topping', modifier_groups: 'Toppings', locations: 'All Locations', price: 15 },
    { id: '11', title: 'Saffron', crm_title: 'Premium Spice', modifier_groups: 'Special Add-Ons', locations: 'Hyderabad Branch', price: 100 },
    { id: '12', title: 'Extra Dal Makhani', crm_title: 'Dal Upgrade', modifier_groups: 'Proteins', locations: 'Chennai Branch', price: 80 },
    { id: '13', title: 'Roomali Roti Upgrade', crm_title: 'Bread Upgrade', modifier_groups: 'Bread Options', locations: 'Mumbai Branch', price: 50 },
    { id: '14', title: 'Tandoori Masala', crm_title: 'Special Spice Mix', modifier_groups: 'Condiments', locations: 'Delhi Branch', price: 40 },
    { id: '15', title: 'Extra Biryani Rice', crm_title: 'Rice Add-On', modifier_groups: 'Sides', locations: 'Hyderabad Branch', price: 60 },
    { id: '16', title: 'Makhani Sauce', crm_title: 'Gravy Add-On', modifier_groups: 'Condiments', locations: 'All Locations', price: 50 },
    { id: '17', title: 'Pomegranate Seeds', crm_title: 'Premium Garnish', modifier_groups: 'Toppings', locations: 'Chennai Branch', price: 45 },
    { id: '18', title: 'Pickled Onions', crm_title: 'Side Add-On', modifier_groups: 'Condiments', locations: 'Delhi Branch', price: 20 },
    { id: '19', title: 'Extra Kofta', crm_title: 'Kofta Add-On', modifier_groups: 'Proteins', locations: 'Mumbai Branch', price: 70 },
    { id: '20', title: 'Extra Malai', crm_title: 'Cream Add-On', modifier_groups: 'Toppings', locations: 'All Locations', price: 40 },
];

  constructor() { }

  getAllModifiers():Observable<ModifiersRowData[]>{
        return of(this.modifiersData)
     }
}

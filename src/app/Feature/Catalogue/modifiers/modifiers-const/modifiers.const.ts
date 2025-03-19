import { ModifiersLocationData, ModifiersRowData } from "../modifiers-interface/modifiers.interface";

export class ModifiersConst {
    columns = ['Sr no.', 'Title', 'CRM Title', 'Modifier Groups', 'Locations', 'Price'];
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

    locationsColumns = ['Name', 'Location', 'Stock Count', 'Price At Location'];

    modifiersLocationData: ModifiersLocationData[] = [
        { name: "Paneer Butter Masala", location: "Mumbai", inStock: true, stock_count: 10, local_price: 250 },
        { name: "Chicken Tikka", location: "Delhi", inStock: true, stock_count: 15, local_price: 300 },
        { name: "Masala Dosa", location: "Bangalore", inStock: true, stock_count: 20, local_price: 120 },
        { name: "Hyderabadi Biryani", location: "Hyderabad", inStock: true, stock_count: 12, local_price: 350 },
        { name: "Chole Bhature", location: "Punjab", inStock: false, stock_count: 0, local_price: 180 },
        { name: "Idli Sambar", location: "Chennai", inStock: true, stock_count: 25, local_price: 80 },
        { name: "Rogan Josh", location: "Kashmir", inStock: true, stock_count: 8, local_price: 400 },
        { name: "Aloo Paratha", location: "Amritsar", inStock: true, stock_count: 18, local_price: 90 },
        { name: "Vada Pav", location: "Mumbai", inStock: false, stock_count: 0, local_price: 50 },
        { name: "Pav Bhaji", location: "Pune", inStock: true, stock_count: 22, local_price: 120 },
        { name: "Rasam Rice", location: "Coimbatore", inStock: true, stock_count: 30, local_price: 100 },
        { name: "Fish Curry", location: "Goa", inStock: true, stock_count: 10, local_price: 320 },
        { name: "Mutton Curry", location: "Lucknow", inStock: false, stock_count: 0, local_price: 450 },
        { name: "Kaju Katli", location: "Rajasthan", inStock: true, stock_count: 14, local_price: 600 },
        { name: "Samosa", location: "Agra", inStock: true, stock_count: 50, local_price: 30 },
        { name: "Butter Naan", location: "Delhi", inStock: true, stock_count: 35, local_price: 60 },
        { name: "Pani Puri", location: "Surat", inStock: true, stock_count: 40, local_price: 25 },
        { name: "Tandoori Chicken", location: "Jaipur", inStock: true, stock_count: 16, local_price: 350 },
        { name: "Gulab Jamun", location: "Varanasi", inStock: true, stock_count: 20, local_price: 40 },
        { name: "Paneer Tikka", location: "Ahmedabad", inStock: false, stock_count: 0, local_price: 220 },
      ];

}
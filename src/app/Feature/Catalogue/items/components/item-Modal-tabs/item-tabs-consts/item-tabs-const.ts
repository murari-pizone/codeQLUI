export class ItemTabsConst {
    columns = ['Name', 'Availability', 'Stock Count', 'Meraki Price', 'Hub Price'];
    rows = [
        {
          "locationName": "Mumbai Warehouse",
          "locationTitle": "Main Storage",
          "availability": true,
          "stockCount": 350,
          "merakiPrice": 49.99,
          "hubPrice": 47.99
        },
        {
          "locationName": "Delhi Depot",
          "locationTitle": "Regional Hub",
          "availability": false,
          "stockCount": 200,
          "merakiPrice": 54.75,
          "hubPrice": 52.00
        },
        {
          "locationName": "Bangalore Center",
          "locationTitle": "Distribution Center",
          "availability": true,
          "stockCount": 150,
          "merakiPrice": 42.89,
          "hubPrice": 41.50
        },
        {
          "locationName": "Hyderabad Facility",
          "locationTitle": "Logistics Hub",
          "availability": true,
          "stockCount": 240,
          "merakiPrice": 39.49,
          "hubPrice": 37.25
        },
        {
          "locationName": "Chennai Hub",
          "locationTitle": "Port Storage",
          "availability": false,
          "stockCount": 180,
          "merakiPrice": 45.00,
          "hubPrice": 43.50
        },
        {
          "locationName": "Pune Warehouse",
          "locationTitle": "City Storage",
          "availability": true,
          "stockCount": 160,
          "merakiPrice": 38.99,
          "hubPrice": 37.10
        },
        {
          "locationName": "Kolkata Center",
          "locationTitle": "Eastern Hub",
          "availability": false,
          "stockCount": 220,
          "merakiPrice": 47.75,
          "hubPrice": 45.99
        },
        {
          "locationName": "Ahmedabad Depot",
          "locationTitle": "West Zone Hub",
          "availability": true,
          "stockCount": 190,
          "merakiPrice": 41.25,
          "hubPrice": 39.99
        },
        {
          "locationName": "Jaipur Warehouse",
          "locationTitle": "Northwest Facility",
          "availability": false,
          "stockCount": 140,
          "merakiPrice": 35.99,
          "hubPrice": 34.50
        },
        {
          "locationName": "Lucknow Hub",
          "locationTitle": "Uttar Pradesh Facility",
          "availability": true,
          "stockCount": 210,
          "merakiPrice": 42.50,
          "hubPrice": 40.89
        },
        {
          "locationName": "Surat Warehouse",
          "locationTitle": "Diamond City Facility",
          "availability": true,
          "stockCount": 175,
          "merakiPrice": 39.99,
          "hubPrice": 38.25
        },
        {
          "locationName": "Coimbatore Depot",
          "locationTitle": "Southern Hub",
          "availability": false,
          "stockCount": 155,
          "merakiPrice": 36.50,
          "hubPrice": 35.25
        },
        {
          "locationName": "Nagpur Center",
          "locationTitle": "Central Logistics",
          "availability": true,
          "stockCount": 230,
          "merakiPrice": 44.99,
          "hubPrice": 42.50
        },
        {
          "locationName": "Indore Facility",
          "locationTitle": "MP Storage",
          "availability": false,
          "stockCount": 195,
          "merakiPrice": 40.00,
          "hubPrice": 38.50
        },
        {
          "locationName": "Thiruvananthapuram Hub",
          "locationTitle": "Kerala Capital Depot",
          "availability": true,
          "stockCount": 200,
          "merakiPrice": 43.75,
          "hubPrice": 41.99
        },
        {
          "locationName": "Patna Warehouse",
          "locationTitle": "Bihar Facility",
          "availability": false,
          "stockCount": 145,
          "merakiPrice": 35.50,
          "hubPrice": 33.99
        },
        {
          "locationName": "Bhubaneswar Depot",
          "locationTitle": "Odisha Hub",
          "availability": true,
          "stockCount": 160,
          "merakiPrice": 38.75,
          "hubPrice": 37.10
        },
        {
          "locationName": "Chandigarh Hub",
          "locationTitle": "Punjab & Haryana Storage",
          "availability": false,
          "stockCount": 185,
          "merakiPrice": 41.50,
          "hubPrice": 39.99
        },
        {
          "locationName": "Mysore Warehouse",
          "locationTitle": "Tourism City Depot",
          "availability": true,
          "stockCount": 130,
          "merakiPrice": 33.99,
          "hubPrice": 32.50
        },
        {
          "locationName": "Varanasi Facility",
          "locationTitle": "Religious City Hub",
          "availability": true,
          "stockCount": 210,
          "merakiPrice": 45.99,
          "hubPrice": 44.00
        }
      ]  
}

export class RecommendationTabsConst {
  recommendationColumn = ['TITLE', 'CATEGORY', 'PRICE'];
  recommendationRows =  [
    { id: '1', title: 'Margherita Pizza', category: 'Main Course', price: 12.99 },
    { id: '2', title: 'Caesar Salad', category: 'Appetizer', price: 8.99 },
    { id: '3', title: 'Grilled Chicken Sandwich', category: 'Main Course', price: 10.99 },
    { id: '4', title: 'French Fries', category: 'Side', price: 3.99 },
    { id: '5', title: 'Cheeseburger', category: 'Main Course', price: 11.99 },
    { id: '6', title: 'Tomato Soup', category: 'Appetizer', price: 5.99 },
    { id: '7', title: 'Vanilla Milkshake', category: 'Beverage', price: 4.99 },
    { id: '8', title: 'Chocolate Cake', category: 'Dessert', price: 6.99 },
    { id: '9', title: 'Chicken Wings', category: 'Appetizer', price: 9.99 },
    { id: '10', title: 'Spaghetti Carbonara', category: 'Main Course', price: 13.99 },
    { id: '11', title: 'Garlic Bread', category: 'Side', price: 4.49 },
    { id: '12', title: 'Tiramisu', category: 'Dessert', price: 7.99 },
    { id: '13', title: 'Margarita Cocktail', category: 'Beverage', price: 9.5 },
    { id: '14', title: 'Pepperoni Pizza', category: 'Main Course', price: 14.99 },
    { id: '15', title: 'Greek Salad', category: 'Appetizer', price: 9.49 },
    { id: '16', title: 'Iced Tea', category: 'Beverage', price: 2.99 },
    { id: '17', title: 'Fish Tacos', category: 'Main Course', price: 12.5 },
    { id: '18', title: 'Brownie Sundae', category: 'Dessert', price: 8.49 },
    { id: '19', title: 'Buffalo Chicken Pizza', category: 'Main Course', price: 15.99 },
    { id: '20', title: 'Onion Rings', category: 'Side', price: 3.99 },
  ]
}

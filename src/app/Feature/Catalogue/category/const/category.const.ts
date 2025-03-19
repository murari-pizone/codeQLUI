import { Category, SubCatDetail, SubCategory } from "../interface/category.interface";

export class CategoryConst{
    categories: Category[] = [
        { id: '1', name: 'Diwali Special', isSelected: false },
        { id: '2', name: 'Festival Pack', isSelected: false },
        { id: '3', name: 'FESTIVE GIFTING SPECIALS', isSelected: false },
        { id: '4', name: "March's Day Special Combos", isSelected: false },
        { id: '5', name: 'Basumati Specials', isSelected: false },
        { id: '6', name: 'South Indian', isSelected: false },
        { id: '7', name: 'North Indian', isSelected: false },
        { id: '8', name: 'Tandoori', isSelected: false },
        { id: '9', name: 'Chinese', isSelected: false },
        { id: '10', name: 'Rice', isSelected: false },
        { id: '11', name: 'Lunch Special', isSelected: false },
        { id: '12', name: 'Breakfast Delight', isSelected: false },
        { id: '13', name: 'Dinner Feast', isSelected: false },
        { id: '14', name: 'Vegan Options', isSelected: false },
        { id: '15', name: 'Desserts', isSelected: false },
        { id: '16', name: 'Snacks', isSelected: false },
        { id: '17', name: 'Quick Bites', isSelected: false },
        { id: '18', name: 'Salads', isSelected: false },
        { id: '19', name: 'Beverages', isSelected: false },
        { id: '20', name: 'Combo Meals', isSelected: false },
        { id: '21', name: 'Street Food', isSelected: false },
        { id: '22', name: 'Health Pack', isSelected: false },
        { id: '23', name: 'Family Pack', isSelected: false },
        { id: '24', name: 'Kids Special', isSelected: false },
        { id: '25', name: 'Seasonal Special', isSelected: false },
        { id: '26', name: 'Chef’s Choice', isSelected: false },
        { id: '27', name: 'Holiday Feast', isSelected: false },
        { id: '28', name: 'International Cuisine', isSelected: false },
        { id: '29', name: 'Spicy Specials', isSelected: false },
        { id: '30', name: 'Sweet Treats', isSelected: false },
        { id: '31', name: 'Midnight Munchies', isSelected: false },
        { id: '32', name: 'Weekend Specials', isSelected: false },
        { id: '33', name: 'Signature Dishes', isSelected: false },
        { id: '34', name: 'Party Combos', isSelected: false },
        { id: '35', name: 'Starter Specials', isSelected: false },
        { id: '36', name: 'Main Course', isSelected: false },
        { id: '37', name: 'Curries', isSelected: false },
        { id: '38', name: 'Grill Specials', isSelected: false },
        { id: '39', name: 'Fusion Foods', isSelected: false },
        { id: '40', name: 'Chef’s Signature', isSelected: false },
      ];
    
      subcategories: SubCategory[] = [
        {
          id: '1',
          categoryId:'',
          subCategoryItems: [
            {
              name: 'Sweets', sortOrder: 1, status: 'Archive', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: 'Sweets-1', assoLocation: 1, assoBrand: '', price: 526 },
                { itemName: 'Sweets-2', assoLocation: 2, assoBrand: '', price: 516 },
                { itemName: 'Sweets-3', assoLocation: 3, assoBrand: '', price: 156 },
                { itemName: 'Sweets-4', assoLocation: 4, assoBrand: '', price: 256 },
                { itemName: 'Sweets-5', assoLocation: 5, assoBrand: '', price: 356 },
                { itemName: 'Sweets-6', assoLocation: 6, assoBrand: '', price: 456 },
                { itemName: 'Sweets-7', assoLocation: 7, assoBrand: '', price: 556 },
                { itemName: 'Sweets-8', assoLocation: 8, assoBrand: '', price: 656 },
                { itemName: 'Sweets-9', assoLocation: 9, assoBrand: '', price: 756 },
                { itemName: 'Sweets-10', assoLocation: 10, assoBrand: '', price: 856 },
                { itemName: 'Sweets-11', assoLocation: 11, assoBrand: '', price: 956 },
                { itemName: 'Sweets-12', assoLocation: 12, assoBrand: '', price: 324 },
                { itemName: 'Sweets-13', assoLocation: 13, assoBrand: '', price: 536 },
                { itemName: 'Sweets-14', assoLocation: 14, assoBrand: '', price: 234 },
                { itemName: 'Sweets-15', assoLocation: 15, assoBrand: '', price: 456 },
                { itemName: 'Sweets-16', assoLocation: 16, assoBrand: '', price: 234 },
                { itemName: 'Sweets-17', assoLocation: 17, assoBrand: '', price: 768 },
                { itemName: 'Sweets-21', assoLocation: 18, assoBrand: '', price: 345 },
                { itemName: 'Sweets-20', assoLocation: 19, assoBrand: '', price: 458 },
                { itemName: 'Sweets-19', assoLocation: 20, assoBrand: '', price: 43 },
                { itemName: 'Sweets-18', assoLocation: 21, assoBrand: '', price: 987 },
              ],
            },
            { name: 'Snacks', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: 'Snacks-1', assoLocation: 6, assoBrand: '', price: 56 },
                { itemName: 'Snacks-2', assoLocation: 7, assoBrand: '', price: 56 },
                { itemName: 'Snacks-3', assoLocation: 8, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Gifts', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special' ,
              associatedItems: [
                { itemName: 'Gifts-1', assoLocation: 9, assoBrand: '', price: 56 },
                { itemName: 'Gifts-2', assoLocation: 10, assoBrand: '', price: 56 },
                { itemName: 'Gifts-3', assoLocation: 11, assoBrand: '', price: 56 },
                { itemName: 'Gifts-4', assoLocation: 12, assoBrand: '', price: 56 },
                { itemName: 'Gifts-5', assoLocation: 13, assoBrand: '', price: 56 },
              ],
            },
            { name: 'Decorations', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: 'Decorations-1', assoLocation: 43, assoBrand: '', price: 435 },
                { itemName: 'Decorations-2', assoLocation: 45, assoBrand: '', price: 456 },
                { itemName: 'Decorations-3', assoLocation: 46, assoBrand: '', price: 657 },
                { itemName: 'Decorations-4', assoLocation: 67, assoBrand: '', price: 568 },
                { itemName: 'Decorations-5', assoLocation: 66, assoBrand: '', price: 345 },
                { itemName: 'Decorations-6', assoLocation: 65, assoBrand: '', price: 43 },
                { itemName: 'Decorations-7', assoLocation: 64, assoBrand: '', price: 345 },
                { itemName: 'Decorations-8', assoLocation: 63, assoBrand: '', price: 234 },
                { itemName: 'Decorations-9', assoLocation: 62, assoBrand: '', price: 678 },
                { itemName: 'Decorations-10', assoLocation: 61, assoBrand: '', price: 985 },
                { itemName: 'Decorations-24', assoLocation: 60, assoBrand: '', price: 734 },
                { itemName: 'Decorations-23', assoLocation: 59, assoBrand: '', price: 764 },
                { itemName: 'Decorations-22', assoLocation: 58, assoBrand: '', price: 432 },
                { itemName: 'Decorations-21', assoLocation: 57, assoBrand: '', price: 657 },
                { itemName: 'Decorations-20', assoLocation: 56, assoBrand: '', price: 937 },
                { itemName: 'Decorations-19', assoLocation: 55, assoBrand: '', price: 764 },
                { itemName: 'Decorations-18', assoLocation: 54, assoBrand: '', price: 376 },
                { itemName: 'Decorations-17', assoLocation: 53, assoBrand: '', price: 457 },
                { itemName: 'Decorations-16', assoLocation: 52, assoBrand: '', price: 467 },
                { itemName: 'Decorations-15', assoLocation: 51, assoBrand: '', price: 686 },
                { itemName: 'Decorations-14', assoLocation: 50, assoBrand: '', price: 345 },
                { itemName: 'Decorations-13', assoLocation: 49, assoBrand: '', price: 324 },
                { itemName: 'Decorations-12', assoLocation: 48, assoBrand: '', price: 237 },
                { itemName: 'Decorations-11', assoLocation: 47, assoBrand: '', price: 328 },
              ],
             },
            { name: 'Special Combos', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [],
             },
            { name: 'Dry Fruits', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: '', assoLocation: 18, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Festival Packs', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special' ,
              associatedItems: [
                { itemName: '', assoLocation: 19, assoBrand: '', price: 56 },
              ],
            },
            { name: 'Lights & Candles', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: '', assoLocation: 2, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Traditional Wear', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: '', assoLocation: 21, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Sweet Boxes', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special' ,
              associatedItems: [
                { itemName: '', assoLocation: 22, assoBrand: '', price: 56 },
              ],
            },
            { name: 'Sweets', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special' ,
              associatedItems: [
                { itemName: '', assoLocation: 23, assoBrand: '', price: 56 },
              ],
            },
            { name: 'Snacks', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special' ,
              associatedItems: [
                { itemName: '', assoLocation: 24, assoBrand: '', price: 56 },
              ],
            },
            { name: 'Gifts', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: '', assoLocation: 25, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Decorations', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: '', assoLocation: 26, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Special Combos', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: '', assoLocation: 27, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Dry Fruits', sortOrder: 1, status: 'Active', pCategory: 'Diwali Special',
              associatedItems: [
                { itemName: '', assoLocation: 28, assoBrand: '', price: 56 },
              ],
             },
          ],
        },
        {
          id: '2',
          categoryId:'',
          subCategoryItems: [
            { name: 'Holi Colors', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack',
              associatedItems: [
                { itemName: '', assoLocation: 29, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Thandai', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack',
              associatedItems: [
                { itemName: '', assoLocation: 30, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Pichkaris', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack',
              associatedItems: [
                { itemName: '', assoLocation: 31, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Gujiya', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack',
              associatedItems: [
                { itemName: '', assoLocation: 32, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Festival Drinks', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack',
              associatedItems: [
                { itemName: '', assoLocation: 33, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Snack Items', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack',
              associatedItems: [
                { itemName: '', assoLocation: 34, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Party Decorations', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack',
              associatedItems: [
                { itemName: '', assoLocation: 35, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Sweets', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack',
              associatedItems: [
                { itemName: '', assoLocation: 36, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Special Offers', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack',
              associatedItems: [
                { itemName: '', assoLocation: 37, assoBrand: '', price: 56 },
              ],
             },
            { name: 'Combo Packs', sortOrder: 1, status: 'Active', pCategory: 'Festival Pack' ,
              associatedItems: [
                { itemName: '', assoLocation: 38, assoBrand: '', price: 56 },
              ],
            },
          ],
        },
        {
          id: '3',
          categoryId:'',
          subCategoryItems: [
            {
              name: 'Gift Cards', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 39, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Custom Hampers', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 40, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Greeting Cards', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 41, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Chocolates', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 42, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Flowers', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 43, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Personalized Gifts', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 44, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Festive Decor', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 45, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Baking Kits', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 46, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Special Wraps', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 47, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Holiday Ornaments', sortOrder: 1, status: 'Active', pCategory: 'FESTIVE GIFTING SPECIALS',
              associatedItems: [
                { itemName: '', assoLocation: 48, assoBrand: '', price: 56 },
              ],
            },
          ],
        },
        {
          id: '4',
          categoryId:'',
          subCategoryItems: [
            {
              name: 'Flower Bouquets', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 49, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Jewelry', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 50, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Spa Kits', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 51, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Health Care', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 52, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Customized Cards', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 53, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Gift Baskets', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 54, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Special Cakes', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 55, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Handmade Gifts', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 56, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Perfumes', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 57, assoBrand: '', price: 56 },
              ],
            },
            {
              name: 'Clothing', sortOrder: 1, status: 'Active', pCategory: "March's Day Special Combos",
              associatedItems: [
                { itemName: '', assoLocation: 58, assoBrand: '', price: 56 },
              ],
            },
          ],
        },
        {
          id: '5',
          categoryId:'',
          subCategoryItems: [
            {
              name: 'South Indian Specialties', sortOrder: 1, pCategory: 'Basumati Specials', status: 'Active',
              associatedItems: [
                { itemName: '', assoLocation: 59, assoBrand: '', price: 56 },
              ],
            },
          ],
        },
        { id: '6', categoryId:'', subCategoryItems: [] },
        { id: '7', categoryId:'', subCategoryItems: [] },
        { id: '8', categoryId:'', subCategoryItems: [] },
        { id: '9', categoryId:'', subCategoryItems: [] },
        { id: '10', categoryId:'', subCategoryItems: [] },
        { id: '11', categoryId:'', subCategoryItems: [] },
        { id: '12', categoryId:'', subCategoryItems: [] },
        { id: '13', categoryId:'', subCategoryItems: [] },
        { id: '14', categoryId:'', subCategoryItems: [] },
        { id: '15', categoryId:'', subCategoryItems: [] },
        { id: '16', categoryId:'', subCategoryItems: [] },
        { id: '17', categoryId:'', subCategoryItems: [] },
        { id: '18', categoryId:'', subCategoryItems: [] },
        { id: '19', categoryId:'', subCategoryItems: [] },
        { id: '20', categoryId:'', subCategoryItems: [] },
        { id: '21', categoryId:'', subCategoryItems: [] },
        { id: '22', categoryId:'', subCategoryItems: [] },
        { id: '23', categoryId:'', subCategoryItems: [] },
        { id: '24', categoryId:'', subCategoryItems: [] },
        { id: '25', categoryId:'', subCategoryItems: [] },
        { id: '26', categoryId:'', subCategoryItems: [] },
        { id: '27', categoryId:'', subCategoryItems: [] },
        { id: '28', categoryId:'', subCategoryItems: [] },
        { id: '29', categoryId:'', subCategoryItems: [] },
        { id: '30', categoryId:'', subCategoryItems: [] },
        { id: '31', categoryId:'', subCategoryItems: [] },
        { id: '32', categoryId:'', subCategoryItems: [] },
        { id: '33', categoryId:'', subCategoryItems: [] },
        { id: '34', categoryId:'', subCategoryItems: [] },
        { id: '35', categoryId:'', subCategoryItems: [] },
        { id: '36', categoryId:'', subCategoryItems: [] },
        { id: '37', categoryId:'', subCategoryItems: [] },
        { id: '38', categoryId:'', subCategoryItems: [] },
        { id: '39', categoryId:'', subCategoryItems: [] },
        { id: '40', categoryId:'', subCategoryItems: [] },
      ];
      editCategory: SubCatDetail[] = [];
      active = 'active'
      Basic_Information = 'Basic Information'
}
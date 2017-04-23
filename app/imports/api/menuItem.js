import { Mongo } from 'meteor/mongo';
import { Class, Enum } from 'meteor/jagi:astronomy';
import { inventoryItem } from './ingredient.js';

export const MenuItems = new Mongo.Collection('menuitems');

/**
 * @readonly
 * @enum {Number}
 * @summary Enum for order types.
 *
 * @todo Convert this Enum from type: Number to type: String and refactor code based on change
 */
export const ORDER_TYPE = Enum.create({
	name: 'orderType',
	identifiers: {
		/** Basic meal stages*/
		REFRESHMENT: 0,
		APPETIZER: 1,
		ENTREE: 2,
		DESSERT: 3,
		/** Unclassified orders*/
		OTHER: 4,
		/** Cancelled order*/
		CANCELLED: 5
		
	}
});

export const POPULARITY = Enum.create({
	name: 'popularity',
	identifiers: {
		/** Basic meal stages*/
		EXCLUSIVE: 0,
		HIGH: 1,
		MEDIUM: 2,
		LOW: 3,
		DEFAULT: -1
	}
});

export const ingredientsArray = Class.create({
    name: 'ingredientsArray',
    fields: {
        ingItemID: {
            type: Number
        },
        ingQuantity: {
            type: Number
        }
    }
});

/**
 * @class MenuItem
 * @summary Class representing an item on a menu.
 * @param {Number} itemID - Unique item identifier
 * @param {String} itemName - Name of the item
 * @param {String} itemDescription - Describes the item
 * @param {ORDER_TYPE} mealType - The type of item
 * @param {Number} itemPrice - The cost of the item
 * @param {Number} cookTime - Time to make the item in minutes
 */
export const MenuItem = Class.create({
    name: 'MenuItem',
	collection: MenuItems,
	fields: {
		itemID: {
			type: Number
		},
		itemName: {
			type: String
		},
		itemDescription: {
			type: String
		},
		mealType: {
			type: ORDER_TYPE
		},
		itemPrice: {
			type: Number
		},
		cookTime: {
			type: Number
		},
		ingredients: {
			type: [ingredientsArray]
		},
		timesOrdered: {
			type: Number
		},
		itemPopularity: {
			type: POPULARITY
		}
	},
	meteorMethods: {
    	incrementTimesOrdered() {
    		this.timesOrdered++;
    		return this.save();
		},
		setCookTime(mTime) {
            this.cookTime = mTime;
            return this.save();
        },
		getIngredientPrice(mIngID) {
			let mInventoryItem = inventoryItem.findOne({ invID: mIngID });
			return mInventoryItem.invPrice / mInventoryItem.invPerUnit;
		},
		setItemPopularity(mItemPopularity) {
			this.itemPopularity = mItemPopularity;
			return this.save();
		}
    }
});





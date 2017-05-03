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

/**
 * @readonly
 * @enum {Number}
 * @summary Enum for popularity levels
 *
 * @todo Convert this Enum from type: Number to type: String and refactor code based on change
 */
export const POPULARITY = Enum.create({
	name: 'popularity',
	identifiers: {
		/* Meanings described in report **/
		EXCLUSIVE: 0,
		HIGH: 1,
		MEDIUM: 2,
		LOW: 3,
		DEFAULT: -1
	}
});

/**
 * @class MenuItem
 * @summary Class representing an items ingredients.
 * @param {Number} ingItemID - Unique ingredient identifier
 * @param {String} itemName - Quantity of the corressponding ingItemID
 */
 
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
 * @param {inredientsArray} ingredients - The ingredients for a menu item
 * @param {Number} timesOrdered - The number of times the item was ordered in its lifetime
 * @param {POPULARITY} itemPopularity - The item's popularity level
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
		/**
		 * @function incrementTimesOrdered
		 * @summary Increments the timesOrdered attribute by one
		 * @returns {Number} Status of database write operation
		 */
    	incrementTimesOrdered() {
    		this.timesOrdered++;
    		return this.save();
		},
		/**
		 * @function setCookTime
		 * @summary Sets the cookTime attribute of `this` to mTime
		 * @returns {Number} Status of database write operation
		 */
		setCookTime(mTime) {
            this.cookTime = mTime;
            return this.save();
        },
		/**
		 * @function getIngredientPrice
		 * @summary Gets the price for an individual ingredient identified as mIngID
		 * @returns {Number} Status of database write operation
		 */
		getIngredientPrice(mIngID) {
			let mInventoryItem = inventoryItem.findOne({ invID: mIngID });
			return mInventoryItem.invPrice / mInventoryItem.invPerUnit;
		},
		/**
		 * @function setItemPopularity
		 * @summary Sets the itemPopularity attribute of `this`
		 * @returns {Number} Status of database write operation
		 */
		setItemPopularity(mItemPopularity) {
			this.itemPopularity = mItemPopularity;
			return this.save();
		}
    }
});





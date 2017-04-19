import { Class, Enum, Type } from 'meteor/jagi:astronomy';
import { Orders } from './order.js';
import { MenuItem, MenuItems, ORDER_TYPE} from './menuItem.js';
//export const orderQueueItems = new Mongo.Collection('orderQueueItems');

/**
 * @function start
 * @summary Starts the priority manager, initializes the different variables needed for the function, operates on those variables to calculate the priorities
 * @returns {Array.<orderItems>} An array of order items in the correct order
 **/

/** Node time picked based on longest item to cook **/

//let NODE_TIME_LENGTH = MenuItem.findOne({ $max: cookTime }) * 60;
let ACTIVE_NODES = [];
let AVG_ORDER_TIMES = [[],[],[]];

export default function updatePriorityManager() {
	let orders = Orders.find({ isCompleted: false }, { sort: { timePlaced: 1 } });

	let mOrderQueueItems = [];

	/** Create a new time node if there no nodes created **/
	/*if (ACTIVE_NODES.length == 0) {
		/** Get a date value. We don't want this changing on the microscale **
		let nodeCreationTime = new Date.getTime();
		ACTIVE_NODES.push(new timeNode({
			startTime: nodeCreationTime,
			endTime: nodeCreationTime + NODE_TIME_LENGTH * 1000,
			priorityVal
		}))
	}*/
	
	orders.forEach(function (order) {
        AVG_ORDER_TIMES = [[],[],[]];
		let nApp = 0, nEnt = 0, nDes = 0;
		let tApp = 0, tEnt = 0, tDes = 0;
		let S1 = 30, S2 = 20, S3 = 10;
		let prtyApp = 0, prtyEnt = 0, prtyDes = 0;
		let orderItems = order.orderItems; // returns array of orderItems
		
		orderItems.forEach(function(orderItem) {
            if (orderItem.isCompleted == false) {
				var menuItem = MenuItems.findOne({ itemID: orderItem.menuItemID });
				mOrderQueueItems.push(mOrderQueueItem = new orderQueueItem({
					orderID: order.orderID,
					itemID: orderItem.itemID,
					menuItemID: orderItem.menuItemID,
					itemName: menuItem.itemName,
					mealType: ORDER_TYPE.getIdentifier(menuItem.mealType),
					cookTime: menuItem.cookTime,
					specialRequests: orderItem.specialRequests,
					priorityVal: 0
				}));

				if (menuItem.mealType == ORDER_TYPE.APPETIZER) {
					nApp++;
					tApp += menuItem.cookTime;
				}
				else if (menuItem.mealType == ORDER_TYPE.ENTREE) {
					nEnt++;
					tEnt += menuItem.cookTime;
				}
				else if (menuItem.mealType == ORDER_TYPE.DESSERT) {
					nDes++;
					tDes += menuItem.cookTime;
				}
			}
		});
		//console.log("orderID: " + order.orderID);

		if (nApp) {

			//console.log("nApp value is " + nApp);
            AVG_ORDER_TIMES[0].push([
                order.orderID,
                tApp / nApp
            ]);
        }

        else {

            AVG_ORDER_TIMES[0].push([
                order.orderID,
                0
            ]);
		}


		if (nEnt) {

            AVG_ORDER_TIMES[1].push([
                order.orderID,
                tEnt / nEnt
            ]);
        }

        else {

			AVG_ORDER_TIMES[1].push([
				order.orderID,
				0
			]);
		}

        if (nDes) {

            AVG_ORDER_TIMES[2].push([
                order.orderID,
                tDes / nDes
            ]);
        }

        else {

            AVG_ORDER_TIMES[2].push([
                order.orderID,
                0
            ]);
		}
		if (!nApp) {
			if (!nEnt) {
				/** only dessert **/
				prtyDes = S1;
			}
			else if(!nDes) {
				/** only entree **/
				prtyEnt = S1;
			}
			else {
                /** dessert and entree **/
                prtyEnt = S1, prtyDes = S2;
            }
		}
		else {
			if (!nDes) {
				if (!nEnt) {
					/** only appetizer **/
					prtyApp = S1;
				}
				/** appetizer and entree **/
				prtyApp = S1, prtyEnt = S2;
			}
			else if (!nEnt) {
				/** appetizer and dessert **/
				prtyApp = S1, prtyDes = S2;
			}
			else {
                /** all three **/
                prtyApp = S1, prtyEnt = S2, prtyDes = S3;
            }
		}
		//console.log(prtyApp + "   " + prtyEnt + "   " + prtyDes);
		//console.log(nApp + "   " + nEnt + "   " + nDes);
		/** Assign priority values based on stage **/
		mOrderQueueItems.forEach(function(orderItem) {
            console.log("Current order type: " + orderItem.mealType);
			if (orderItem.mealType == "APPETIZER") {
                orderItem.priorityVal = prtyApp;
                //console.log("Setting Appetizer Priority: " + orderItem.priorityVal);
            }
            else if (orderItem.mealType == "ENTREE") {
				orderItem.priorityVal = prtyEnt;
               // console.log("Setting Entree Priority: " + orderItem.priorityVal);
			}
			else if (orderItem.mealType == "DESSERT") {
				orderItem.priorityVal = prtyDes;
            	//console.log("Setting Dessert Priority: " + orderItem.priorityVal);
			}
		});
	});

    orders.forEach(function (order) {
    	let nApps = AVG_ORDER_TIMES[0].length;
    	let nEnts = AVG_ORDER_TIMES[1].length;
    	let nDess = AVG_ORDER_TIMES[2].length;

    	AVG_ORDER_TIMES.forEach(function(element) {
            element.sort(function(a, b) {
                return a[1] - b[1];
            });
		});

    	console.log("AVG ARRAY");
    	console.log(AVG_ORDER_TIMES);
    });




    /** Finally sort the array based on priority   **/
    /** Make all priority calculations before this **/
    mOrderQueueItems.sort(function(a, b) {
        return (b.priorityVal) - parseFloat(a.priorityVal);
    });
	console.log(mOrderQueueItems);
	return mOrderQueueItems;
}

Type.create({
    name: 'timeNode',
    class: 'timeNode'
});

export const timeNode = Class.create({
    name: 'timeNode',
    fields: {
        startTime: {
            type: Date
        },
        endTime: {
            type: Date
        },
        priorityVal: {
            type: Number
        },
		capacity: {
        	type: Number
		},
		quantity: {
        	type: Number
		},
		isFull: {
        	type: Boolean
		}
    }
});

/**
 * @class
 * @classdesc Calculates the priority of each of the orders within the order collection
 */
export const orderQueueItem = Class.create({
	name: 'orderQueueItem',
	//collection: 'orderQueueItems',
	fields: {
		orderID: {
			type: Number
		},
		itemID: {
			type: Number
		},
		menuItemID: {
			type: Number
		},
		itemName: {
			type: String
		},
		mealType: {
			type: ORDER_TYPE
		},
		cookTime: {
			type: Number
		},
		specialRequests: {
			type: String
		},
		priorityVal: {
            type: Number
        },
		node: {
			type: timeNode
		}
	},
	meteorMethods: {
		/**
		 * @function combineMealAndMenuItems
		 * @summary Combines information from both the Order object and the menuItem object
		 * @param order Order object that contains the different fields of an order
		 * @param orderItem A particular field of the an order instance that contains the list of items for a particular order
		 * @param menuItem An object that contains the information specific to each item on the menu
		 * @returns {{orderID: number, itemName: (orderQueue.fields.itemName|{type}|*|string|MenuItem.fields.itemName|selectedItem.fields.itemName), mealType, cookTime: (*|orderQueue.fields.cookTime|{type}|selectedItem.fields.cookTime|MenuItem.fields.cookTime|number), specialRequests: (orderQueue.fields.specialRequests|{type}|*|string|orderItem.fields.specialRequests)}}
		 *
		 * @todo Implement the class to be integrated with Astronomy
		 * @todo Modify the priority algorithm to include unaccounted factors for improved accuracy
		 **/
		setPriorityValue(mPrtyVal) {
			priorityVal = mPrtyVal;
			return this.save();
		}
	}
});
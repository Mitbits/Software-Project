import { Class, Enum, Type } from 'meteor/jagi:astronomy';
import { Orders } from './order.js';
import { MenuItem, MenuItems, ORDER_TYPE} from './menuItem.js';

//const orderQueueItems = new Mongo.Collection('orderQueueItems');

/**
 * @function start
 * @summary Starts the priority manager, initializes the different variables needed for the function, operates on those variables to calculate the priorities
 * @returns {Array.<orderItems>} An array of order items in the correct order
 **/

/** Node time picked based on longest item to cook **/

//let NODE_TIME_LENGTH = MenuItem.findOne({ $max: cookTime }) * 60;
let ACTIVE_NODES = [];
let AVG_ORDER_TIMES = [[],[],[]];
let S1 = 30, S2 = 20, S3 = 10;

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
	AVG_ORDER_TIMES = [[],[],[]];
	
    orders.forEach(function (order) {		
		let nApp = 0, nEnt = 0, nDes = 0;
		
		let tS1 = 0, tS2 = 0, tS3 = 0;
		let nS1 = 0, nS2 = 0, nS3 = 0;
		 
		let prtyApp = 0, prtyEnt = 0, prtyDes = 0;
		let orderItems = order.orderItems; // returns array of orderItems
		
		orderItems.forEach(function(orderItem) {
            if (orderItem.isCompleted == false) {
				var menuItem = MenuItems.findOne({ itemID: orderItem.menuItemID });
				mOrderQueueItems.push(new orderQueueItem({
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
				}
				else if (menuItem.mealType == ORDER_TYPE.ENTREE) {
					nEnt++;
				}
				else if (menuItem.mealType == ORDER_TYPE.DESSERT) {
					nDes++;
				}
			}
		});

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
		
		console.log("orderID:: " + order.orderID);
		/** Assign priority values based on stage **/
		mOrderQueueItems.forEach(function(orderItem) {
			if (order.orderID == orderItem.orderID) {
				if (orderItem.mealType == "APPETIZER") {
					orderItem.priorityVal = prtyApp;
				}
				else if (orderItem.mealType == "ENTREE") {
					orderItem.priorityVal = prtyEnt;
				}
				else if (orderItem.mealType == "DESSERT") {
					orderItem.priorityVal = prtyDes;
				}
				
				if (orderItem.priorityVal == S1) {
					tS1 += orderItem.cookTime;
					nS1++;
				}
				else if (orderItem.priorityVal == S2) {
					tS2 += orderItem.cookTime;
					nS2++;
				}
				else if (orderItem.priorityVal == S3) {
					tS3 += orderItem.cookTime;
					nS3++;
				}
			}
		});
	});
		/*
		let orderItemsS1 = [], orderItemsS2 = [], orderItemsS3 = [];
		mOrderQueueItems.forEach(function(element){
		
			if(element.priorityVal == S1){
				
				orderItemsS1.push(element);
			}
			else if(element.priorityVal == S2){
				orderItemsS2.push(element);
				
			}
			else if(element.priorityVal == S3){
				orderItemsS3.push(element);
			}
		
		
		});
		
		orderItemsS1.sort(function(a, b) {
			return b[5] - a[5];
		});
		
		orderItemsS2.sort(function(a, b) {
			return b[5] - a[5];
		});
		
		orderItemsS3.sort(function(a, b) {
			return b[5] - a[5];
		});
			
		if (nS1) {
            AVG_ORDER_TIMES[0].push([
                order.orderID,
                tS1, nS1,
				orderItemsS1
            ]);
        }
        else {
            AVG_ORDER_TIMES[0].push([
                order.orderID,
                0,0,
				[]
            ]);
		}

		if (nS2) {
            AVG_ORDER_TIMES[1].push([
                order.orderID,
                tS2 , nS2,
				orderItemsS2
            ]);
        }
        else {
			AVG_ORDER_TIMES[1].push([
				order.orderID,
				0,0,
				[]
			]);
		}

        if (nS3) {
            AVG_ORDER_TIMES[2].push([
                order.orderID,
                tS3 , nS3,
				orderItemsS3
            ]);
        }
        else {
            AVG_ORDER_TIMES[2].push([
                order.orderID,
                0,0,
				[]
            ]);
		}		
	});

	AVG_ORDER_TIMES.forEach(function(element) {
        element.sort(function(a, b) {
			return b[1] - a[1];
        });
	});
	
	let numS1 = 0, numS2 = 0, numS3 = 0;
	
	console.log(AVG_ORDER_TIMES);
	
	let numS1ItemsMit = 0;
	AVG_ORDER_TIMES[0].forEach(function(order) {
		numS1ItemsMit += order[3].length
		console.log(AVG_ORDER_TIMES[0][3]);
	});
	console.log("numS1ItemsMit: " + numS1ItemsMit);
	
	for (let mit = 0; mit < numS1ItemsMit; mit++) {
		let avgMax = [[]], numS1Items;
		
		AVG_ORDER_TIMES[0].forEach(function(order) {
			let cookTimeSum = 0;
			for (let i = 0; i < order[3].length; i++) {
				cookTimeSum += order[3][i].cookTime; 
				numS1Items++;
			}
			let avgTime = cookTimeSum / order[3].length;
			avgMax.push([
				avgTime,
				order[0]
			]);
		});

		avgMax.sort(function(a, b) {
			return b[0] - a[0];
        });
		
		AVG_ORDER_TIMES[0].forEach(function(order) {
			console.log("order[0]: " + order[0]);
			console.log("avgMax[0][1]: " + avgMax);
			if (order[0] == avgMax[0][1]) {
				order[3][0].priorityVal += numS1Items;
				console.log(order[3][0].priorityVal);
				order[3].shift();
			}
		});
	}
	
	
	*/
	//console.log("AVG ARRAY");
    //console.log(AVG_ORDER_TIMES);

    /** Finally sort the array based on priority   **/
    /** Make all priority calculations before this **/
    mOrderQueueItems.sort(function(a, b) {
        return (b.priorityVal) - parseFloat(a.priorityVal);
    });
	
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
	//collection: orderQueueItems,
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
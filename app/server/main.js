import { Meteor } from 'meteor/meteor';
import {initData} from './dataDriver.js';
import { Bill } from '../imports/api/billsJS.js';
import { Reservation } from '../imports/api/reservation.js';
import { Order, Orders, orderItem } from '../imports/api/order.js';
import { inventoryItem, inventoryItems } from '../imports/api/ingredient.js';
import { MenuItem, MenuItems, ingredientsArray } from '../imports/api/menuItem.js';
import {ArchivedReservation,ArchivedReservations} from  '../imports/api/data/reservation.js';
import { Table,Tables, TableStatus, TableType, TableManager  } from '../imports/api/table.js';
import { popularItem, itemLeaderboard, POPULARITY_PERIOD } from '../imports/api/mealSuggestions.js';
export var allItems;

/**
 *@function Meteor.startup
 * @summary The code in this file is run every time meteor starts up. The file involves the creation of the sample data needed
 * for the project and pushing them to their respective collections
 */
Meteor.startup(() => {

    initData();
    TableManager.remove({});
    Table.remove({});
    Order.remove({}); //remove late
    Reservation.remove({});
    MenuItem.remove({});
    popularItem.remove({});
    inventoryItems.remove({});
    ArchivedReservation.remove({});
    var date = new Date();
    for (var i = 0; i < 24; i++) {
        new ArchivedReservation({
            "Hour": new Date(date.setHours(i)),
            "Count": Math.ceil(Math.random() * 100)
        }).save();
    }


    var table_manager = new TableManager();
    table_manager.save();
    table_manager.startPollReservations();



    // code to run on server at startup
    var curDate = new Date();

    Tables.remove({});

    var menuItems = require('./menuItems.json');
    var InventoryItems = require('./inventory.json');
    //console.log(menuItems.menu.items[0].ingredients.length);

    if (MenuItem.find().count() == 0) {
        MenuItems.remove({});
        for (var i = 0; i < menuItems.menu.items.length; i++) {
            var ingredientArr = [];
            for (var j = 0; j < menuItems.menu.items[i].ingredients.length; j++) {
                //console.log(menuItems.menu.items[i].ingredients[j]);
                ingredientArr.push(new ingredientsArray({
                    "ingItemID": menuItems.menu.items[i].ingredients[j].itemID,
                    "ingQuantity": menuItems.menu.items[i].ingredients[j].quantity
                }));
            }
            //console.log(ingredientArr)
            new MenuItem({
                "itemID": menuItems.menu.items[i].id,
                "itemName": menuItems.menu.items[i].name,
                "itemDescription": menuItems.menu.items[i].description,
                "mealType": menuItems.menu.items[i].type,
                "itemPrice": menuItems.menu.items[i].price,
                "cookTime": menuItems.menu.items[i].cookTime,
                "ingredients": ingredientArr,
                "timesOrdered": 0,
                "itemPopularity": -1
            }).save();
        }
    }

    if (inventoryItem.find().count() == 0) {
        inventoryItems.remove({});
        for (i = 0; i < InventoryItems.inventory.items.length; i++) {
            var inventory_entry = new inventoryItem({
                "invID": InventoryItems.inventory.items[i].id,
                "invName": InventoryItems.inventory.items[i].name,
                "invUnits": InventoryItems.inventory.items[i].units,
                "invQuantity": InventoryItems.inventory.items[i].quantity,
                "invPrice": InventoryItems.inventory.items[i].price,
                "invPerUnit": InventoryItems.inventory.items[i].perUnit,
                "invThreshold": InventoryItems.inventory.items[i].threshold,
                "invTimesUsed": 0
            });
            inventory_entry.save();
        }
    }

//
        // A wrapper function to create a new orderItem object.
        // These items DO NOT get directly stored in a collection.
        // An order object (which is stored) will hold this data. - @raj
        /**
         * @function createOrderItem
         * @param {Number} mItemID - Unique identifier representing an item within an order
         * @param {Number} mPriority - Priority number for item in the order queue
         * @param {Number} mMenuItemID - Indicates the menuItem this item represents
         * @param {String} mSpecialRequests - Contains any requests by the customer to notify the chef about a particular item
         */
        function createOrderItem(mItemID, mPriority, mMenuItemID, mSpecialRequests) {
            return new orderItem({
                "itemID": mItemID,
                "priority": mPriority,
                "menuItemID": mMenuItemID,
                "specialRequests": mSpecialRequests,
                "actualCookTime": 0,
                "isCompleted": true
            });
        }

        /**
         * @function getRandomNumber
         * @summary Generates a random number
         * @param {Number} min - Lower bound of the random number
         * @param max - Upper bound of the random number
         * @returns {Number}
         */
        function getRandomNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return (Math.floor(Math.random() * (max - min)) + min);
        }

        // Creating an array of requests that can be used for different items
        var specialRequests = ["Less Oil ", "Half a Portion", "Less Butter", "None"];

        // create list of items for a specific order


        /**
         * @function createOrderItems
         * @summary Generates an array of random orderItems using the getRandomNumber and createOrderItem functions. 
         * @returns {Array}
         */
        function createOrderItems() {
            var orderItems = [];

            var numberOfItems = getRandomNumber(1, 11);

            for (var i = 1, next_mItemID = 1; i <= numberOfItems; i++, next_mItemID++) {
                var random_mMenuItemID = getRandomNumber(0, 20);
                var random_mSpecialRequests = specialRequests[getRandomNumber(0, 4)];

                orderItems.push(createOrderItem(next_mItemID, 0, random_mMenuItemID, random_mSpecialRequests));
            }
            return orderItems;
        }


        // Creating 5 order objects and storing in the collection.
        // Each object is getting the same array of `order_items`
        // Change if necessary for more diverse data - @raj
        //
        // var count = 1;
        // for (var i = Date.now() - 7862400000; i <= Date.now(); i += 86400000) {
        //
        // 	var test = createOrderItems();
        //
        // 	var order_entry = new Order({
        // 		"orderID": count,
        // 		"tableID": 0,
        // 		"waiterID": 1,
        // 		"orderItems": test,
        // 		"timePlaced": new Date(i),
        // 		"isCompleted": true
        // 	});
        // 	count++;
        // 	order_entry.save();
        // }


        for (i = 1; i <= 16; i++) {
            //create astronomy table obj entry
            //L_status just for testing
            var table_type = (i % 4) ? TableType.WALKIN : TableType.WALKIN;
            var table_size = 2

            if (i % 4 == 1)
                table_size = 2;
            else if (i % 4 == 2)
                table_size = 4;
            else if (i % 4 == 3)
                table_size = 6;
            else
                table_size = 8;
            if (i > 8)
                table_type = TableType.RESERVATION;
            var table_entry = new Table({
                "size": table_size,
                "table_type": table_type,
            });
            table_entry.save();
        }

        process.env.MAIL_URL = 'smtp://irestaurant12%40gmail.com:ece4life@smtp.gmail.com:587';
        SSR.compileTemplate('htmlEmail', Assets.getText('reservation-email.html'));
        Meteor.methods({
            'sendEmail': function (to, subj, emailData) {
                this.unblock();

                Email.send({
                    to: to,
                    from: 'iRestaurant@ires.com',
                    subject: subj,
                    html: SSR.render('htmlEmail', emailData),
                });
            }
        })


        console.log("\n::: Begin Meal Suggester :::\n");

        let weekItems = [], monthItems = [], quarterItems = [];

        /** It's assumed that MenuItems are being pulled in sorted order as I already set it up in
         the database. So if you change it then you need to change this as well.
         **/
        let allMenuItems = MenuItems.find();

        allMenuItems.forEach(function (menuItem) {
            weekItems.push([0, menuItem.itemID]);
            monthItems.push([0, menuItem.itemID]);
            quarterItems.push([0, menuItem.itemID]);
        });

        let lastWeekDate = new Date(Date.now() - 604800000);
        let lastMonthDate = new Date(Date.now() - 2592000000);
        let lastQuarterDate = new Date(Date.now() - 7824600000);

        let lastWeekOrders = Orders.find({timePlaced: {$gt: lastWeekDate}});
        let lastMonthOrders = Orders.find({timePlaced: {$gt: lastMonthDate}});
        let lastQuarterOrders = Orders.find({timePlaced: {$gt: lastQuarterDate}});

        console.log("\nCounting Last Week Items...")
        lastWeekOrders.forEach(function (order) {
            order.orderItems.forEach(function (orderItem) {
                weekItems[orderItem.menuItemID][0]++;
            });
        });
        //console.log(weekItems);

        console.log("\nCounting Last Month Items...");
        lastMonthOrders.forEach(function (order) {
            order.orderItems.forEach(function (orderItem) {
                monthItems[orderItem.menuItemID][0]++;
            });
        });
        //console.log(monthItems);

        console.log("\nCounting Last Quarter Items...");
        lastQuarterOrders.forEach(function (order) {
            order.orderItems.forEach(function (orderItem) {
                quarterItems[orderItem.menuItemID][0]++;
            });
        });
        //console.log(quarterItems);

        generateStats(weekItems, 0);
        generateStats(monthItems, 1);
        generateStats(quarterItems, 2);

        assignRanks();
        assignPopularity();

        function generateStats(itemCountArray, timePeriod) {
            console.log("Generating Statistics...");
            for (let menuItem = 0; menuItem < MenuItems.find().count(); menuItem++) {
                let COST = 0, REVENUE = 0, PROFIT = 0, costOfMeal = 0;
                let MEAL = MenuItem.findOne({itemID: menuItem});

                for (let ing = 0; ing < MEAL.ingredients.length; ing++) {
                    costOfMeal += MEAL.getIngredientPrice(MEAL.ingredients[ing].ingItemID) * MEAL.ingredients[ing].ingQuantity;
                }

                let nTimesOrdered = itemCountArray[MEAL.itemID][0];
                COST = costOfMeal * nTimesOrdered;
                REVENUE = nTimesOrdered * MEAL.itemPrice;
                PROFIT = REVENUE - COST;

                let pI = new popularItem({
                    "period": timePeriod,
                    "menuItemID": MEAL.itemID,
                    "cost": COST,
                    "profit": PROFIT,
                    "revenue": REVENUE,
                    "rank": 0
                }).save();
            }
        }

        function assignRanks() {
            let maxRank = MenuItem.find().count() * 3;
            let rankCount = 1;

            allItems = popularItem.find({}, {sort: {profit: -1}});

            for (let per = 0; per <= 2; per++) {
                allItems.forEach(function (popItem) {
                    if (popItem.rank == 0 && popItem.period == per) {
                        popItem.setRank(rankCount);
                        rankCount++;
                    }
                });
            }
        }

        function assignPopularity() {
            let allMenuItems = MenuItem.find({});

            allMenuItems.forEach(function (element) {
                let popItems = popularItem.find({menuItemID: element.itemID});

                let flag = [0, 0, 0];
                popItems.forEach(function (popItem) {
                    if (popItem.rank >= 1 && popItem.rank <= 5 ||
                        popItem.rank >= 26 && popItem.rank <= 31 ||
                        popItem.rank >= 51 && popItem.rank <= 56) {
                        flag[popItem.period] = 1;
                    }
                });

                if (flag[0] == 1 && flag[1] == 1 && flag[2] == 1) {
                    element.setItemPopularity(0); // Exclusive
                }
                else if (flag[0] == 1 && flag[1] == 1 && flag[2] == 0) {
                    element.setItemPopularity(2); //Medium
                }
                else if (flag[1] == 1 && flag[2] == 1 && flag[0] == 0) {
                    element.setItemPopularity(1); //High
                }
                else if (flag[1] == 1 && flag[0] == 0 && flag[2] == 0) {
                    element.setItemPopularity(2);
                }
                else if (flag[0] == 1 && flag[1] == 0 && flag[2] == 0) {
                    element.setItemPopularity(1);
                }
                else {
                    element.setItemPopularity(3); // Low
                }
            });
        }

        console.log("\n::: End Meal Suggester :::\n");

});

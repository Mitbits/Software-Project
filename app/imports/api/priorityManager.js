/**
 * Created by mitpatel on 3/24/17.
 */

import { Order, Orders } from './order.js';
import { MenuItem, MenuItems, ORDER_TYPE} from './menuItem.js';
export {PriorityManager};

class PriorityManager{

    static start() {
        var Appetizers = [];
        var Entrees = [];
        var Desserts = [];

        var orders = Orders.find({},{sort: {timePlaced:1}});

        orders.forEach(function (order) {

            var meals = order.orderItems;// returns array of meals

            for (var meal of meals) {

                var menuItem = MenuItems.findOne({itemID:meal.menuItemID});

                if (menuItem.mealType == ORDER_TYPE.APPETIZER) {

                    Appetizers.push(PriorityManager.combineMealAndMenuItem(order,meal,menuItem));

                }

                else if (menuItem.mealType == ORDER_TYPE.ENTREE) {

                    Entrees.push(PriorityManager.combineMealAndMenuItem(order,meal,menuItem));

                }


                else if (menuItem.mealType == ORDER_TYPE.DESSERT) {

                    Desserts.push(PriorityManager.combineMealAndMenuItem(order,meal,menuItem));

                }
            }

        });

        var combinedArray = Appetizers.concat(Entrees).concat(Desserts);

        return combinedArray;

    }


    static combineMealAndMenuItem(order,meal,menuitem){

        return{orderID:order.orderID, itemName:menuitem.itemName, mealType:ORDER_TYPE.getIdentifier(menuitem.mealType), cookTime:menuitem.cookTime,
            specialRequests: meal.specialRequests};

    }

}
//written by Dylan Herman
//tested by Dylan Herman
//debugged by Dylan Herman

import {Meteor} from 'meteor/meteor';
import {Order, Orders, orderItem} from '../../order.js';
import {chai} from 'meteor/practicalmeteor:chai';
import {PriorityManager} from '../../priorityManager.js';
import {MenuItem, ORDER_TYPE, ingredientsArray, POPULARITY} from '../../menuItem.js';

if(Meteor.isServer) {
  describe('Priority Manager', () => {
    describe('methods', () => {
      beforeEach(() => {
        var ing = new ingredientsArray({
            ingItemID: 2,
            ingQuantity: 34
        });
        
        var ingArray = [ing];
        MenuItem.remove({});
        item = new MenuItem({
          itemID: 1,
      		itemName: "TestItem",
      		itemDescription: "None",
      		mealType: 1,
      		itemPrice: 0.00,
      		cookTime: 12,
            ingredients: ingArray,
            timesOrdered: 2,
            itemPopularity: POPULARITY.MEDIUM
        });
        item.save();
        item = new MenuItem({
          itemID: 2,
          itemName: "TestItem",
          itemDescription: "None",
          mealType: 2,
          itemPrice: 0.00,
          cookTime: 12,
            ingredients: ingArray,
            timesOrdered: 2,
           itemPopularity: POPULARITY.MEDIUM
        });
        item.save();
        item = new MenuItem({
          itemID: 3,
          itemName: "TestItem",
          itemDescription: "None",
          mealType: 3,
          itemPrice: 0.00,
          cookTime: 12,
            ingredients: ingArray,
            timesOrdered: 2,
            itemPopularity: POPULARITY.MEDIUM
        });
        item.save();
      }),
      it('returns an empty array when there are no orders', () => {
        var arr = new PriorityManager().start();
        chai.assert.equal(arr.length, 0);
      }),
      it('prioritizes order by time placed', () => {
        Orders.remove({});
        var newOrder = new Order({
          tableID: 2,
          orderID: 1,
          waiterID: 1,
          orderItems: [new orderItem({
            actualCookTime: 6.56,
            itemID: 1,
            priority: 90,
            menuItemID: 1,
            specialRequests: "NONE"
          })],
          timePlaced: new Date(),
        });
        newOrder.save();
        newOrder1 = new Order({
	  tableID: 3,
          orderID: 2,
          waiterID: 1,
          orderItems: [new orderItem({
	    actualCookTime:1.23,
            itemID: 2,
            priority: 90,
            menuItemID: 1,
            specialRequests: "NONE"
          })],
          timePlaced: new Date(),
        });
        newOrder1.save();
        var priorityManager = new PriorityManager();
	priorityManager.set_order(newOrder);
	priorityManager.set_order(newOrder1);
	var arr = priorityManager.start();
        chai.assert.equal(arr[0].orderID, 1);
        chai.assert.equal(arr[1].orderID, 2);
      }),
      it('prioritizes order by appetizer, entree and dessert in that order', () => {
        Orders.remove({});
        var newOrder = new Order({
	  tableID: 3,
          orderID: 1,
          waiterID: 1,
          orderItems: [new orderItem({
            actualCookTime: 3.54,
            itemID: 1,
            priority: 90,
            menuItemID: 1,
            specialRequests: "NONE"
          }),
          new orderItem({
            actualCookTime: 4.34,
            itemID: 2,
            priority: 90,
            menuItemID: 2,
            specialRequests: "NONE"
          }),
          new orderItem({
            actualCookTime: 2.34,
            itemID: 3,
            priority: 90,
            menuItemID: 3,
            specialRequests: "NONE"
          })],
          timePlaced: new Date(),
        });
        newOrder.save();
        var priorityManager =  new PriorityManager();
	var arr = priorityManager.set_orders(newOrder);
        chai.assert.equal(arr[0].mealType, ORDER_TYPE.APPETIZER);
        chai.assert.equal(arr[1].mealType, ORDER_TYPE.ENTREE);
        chai.assert.equal(arr[2].mealType, ORDER_TYPE.DESSERT);
      })
    });
  });
}

import {Meteor} from 'meteor/meteor';
import {Order, Orders, orderItem} from '../order.js';
import {chai} from 'meteor/practicalmeteor:chai';
import {PriorityManager} from '../priorityManager.js';
import {MenuItem, ORDER_TYPE} from '../menuItem.js';

if(Meteor.isServer) {
  describe('Priority Manager', () => {
    describe('methods', () => {
      beforeEach(() => {
        MenuItem.remove({});
        item = new MenuItem({
          itemID: 1,
      		itemName: "TestItem",
      		itemDescription: "None",
      		mealType: 1,
      		itemPrice: 0.00,
      		cookTime: 12
        });
        item.save();
        item = new MenuItem({
          itemID: 2,
          itemName: "TestItem",
          itemDescription: "None",
          mealType: 2,
          itemPrice: 0.00,
          cookTime: 12
        });
        item.save();
        item = new MenuItem({
          itemID: 3,
          itemName: "TestItem",
          itemDescription: "None",
          mealType: 3,
          itemPrice: 0.00,
          cookTime: 12
        });
        item.save();
      }),
      it('returns an empty array when there are no orders', () => {
        var arr = PriorityManager.start();
        chai.assert.equal(arr.length, 0);
      }),
      it('prioritizes order by time placed', () => {
        Orders.remove({});
        var newOrder = new Order({
          orderID: 1,
          waiterID: 1,
          orderItems: [new orderItem({
            itemID: 1,
            priority: 90,
            menuItemID: 1,
            specialRequests: "NONE"
          })],
          timePlaced: new Date(),
        });
        newOrder.save();
        newOrder1 = new Order({
          orderID: 2,
          waiterID: 1,
          orderItems: [new orderItem({
            itemID: 2,
            priority: 90,
            menuItemID: 1,
            specialRequests: "NONE"
          })],
          timePlaced: new Date(),
        });
        newOrder1.save();
        var arr = PriorityManager.start();
        chai.assert.equal(arr[0].orderID, 1);
        chai.assert.equal(arr[1].orderID, 2);
      }),
      it('prioritizes order by appetizer, entree and dessert in that order', () => {
        Orders.remove({});
        var newOrder = new Order({
          orderID: 1,
          waiterID: 1,
          orderItems: [new orderItem({
            itemID: 1,
            priority: 90,
            menuItemID: 1,
            specialRequests: "NONE"
          }),
          new orderItem({
            itemID: 2,
            priority: 90,
            menuItemID: 2,
            specialRequests: "NONE"
          }),
          new orderItem({
            itemID: 3,
            priority: 90,
            menuItemID: 3,
            specialRequests: "NONE"
          })],
          timePlaced: new Date(),
        });
        newOrder.save();
        var arr = PriorityManager.start();
        console.log(arr);
        chai.assert.equal(arr[0].mealType, 'APPETIZER');
        chai.assert.equal(arr[1].mealType, 'ENTREE');
        chai.assert.equal(arr[2].mealType, 'DESSERT');
      })
    });
  });
}

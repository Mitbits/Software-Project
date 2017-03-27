import {Meteor} from 'meteor/meteor';
import {Order, Orders} from '../order.js';
import {chai} from 'meteor/practicalmeteor:chai';

if(Meteor.isServer) {
  describe('Order', () => {
    describe('methods', () => {
      var newOrder;
      beforeEach(() => {
        Orders.remove({});
        newOrder = new Order({
          orderID: 1,
          waiterID: 1,
          orderItems: [],
          timePlaced: new Date(),
        });
        newOrder.save();
      }),
      it('can create an order with valid fields', () => {
        var foundOrder = Orders.findOne({orderID: 1});
        chai.assert.equal(newOrder.orderID, foundOrder.orderID);
      }),
      it('can delete an order', () => {
        Orders.remove({orderID: 1});
        var foundOrder = Orders.findOne({orderID:1});
        chai.assert.equal(foundOrder, null);
      }),
      it('can edit an order\'s waiter ID', () => {
        var order = Order.findOne({orderID:1});
        order.waiterID = 2;
        order.save();
        var foundOrder = Orders.findOne({waiterID:2});
        chai.assert.notEqual(foundOrder, null);
        chai.assert.equal(newOrder.orderID, foundOrder.orderID);
        chai.assert.notEqual(newOrder.waiterID, foundOrder.waiterID);
      }),
      it('fails if orderID is specified as nonpositive', () => {
        var order = Order.findOne({orderID:1});
        order.orderID = -1;
        try {
          order.save();
        } catch(error) {
          chai.assert.equal(error.reason,'"orderID" has to be greater than 0');
          return;
        }
        throw new Error('Did not catch error that orderID is negative');
      }),
      it('fails if orderID is nonunique', () => {
        var order = new Order({
          orderID: 1,
          waiterID: 2,
          orderItems: [],
          timePlaced: new Date(),
        });
        try {
          order.save();
        } catch(error) {
          chai.assert.equal(error.error,409);
          return;
        }
        throw new Error('Did not catch error that orderID is nonunique');
      })
    });
  });
}

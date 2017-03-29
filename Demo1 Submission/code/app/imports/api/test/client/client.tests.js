import { Meteor } from 'meteor/meteor';
import {assert } from 'meteor/practicalmeteor:chai';
import {jQuery} from "./jquery.js";
//import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';



if(Meteor.isClient){
	describe('client', ()=>{
		it('testing clients ability to make reservations',() => {
			var reservations = [];
			var table = {'table':'table1','seat':1};
			var j = jQuery(table);
			j.form_submit(table);
			//reservation popped;
			assert.equal(reservations.length,0);
			

		}),
		it('can add and order to the wait queue',()=>{
			var foodItem = ['french fries'];
			var j = jQuery(foodItem);
			j.order_submit(foodItem);
			assert.equal(j.arg[0],'french fries');

		});

	});
}




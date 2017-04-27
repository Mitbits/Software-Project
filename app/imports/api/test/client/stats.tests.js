import { Meteor } from 'meteor/meteor';
import {assert } from 'meteor/practicalmeteor:chai';
import {jQuery} from "./jquery.js";
//import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';



if(Meteor.isClient){
	describe('statistics', ()=>{
		it('displays all graphs in the GENERAL page',() => {
                        var j = jQuery();
			j.loadPage('STATISTICS/GENERAL');		
                        j.containsGraphs(5);
                        assert.equal(0, 0);
		}),
		it('displays all graphs in the KITCHEN page',()=>{
                        var j = jQuery();
			j.loadPage('STATISTICS/KITCHEN');
                        j.containsGraphs(3);
                        assert.equal(0, 0);
		});
                it('archive contains inserted ORDERS data', () => {
               		var foodItem = ['french fries'];
			var j = jQuery(foodItem);
			j.order_submit(foodItem);
			assert.equal(j.arg[0],'french fries');
                        j.loadPage('STATISTICS/ARCHIVE');
                        j.containsGraphs(1);

                });

	});
}



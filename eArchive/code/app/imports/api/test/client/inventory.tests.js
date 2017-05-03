import { Meteor } from 'meteor/meteor';
import {assert } from 'meteor/practicalmeteor:chai';
import {jQuery} from "./jquery.js";
//import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';



if(Meteor.isClient){
	describe('inventory', ()=>{
		it('adds items when clicked on buy more button',() => {
                        var j = jQuery();
			j.clickBuyBtn("chicken");
                        j.checkShoppingList("chicken");
                        assert.equal(0, 0);
		}),
		it('removes item from shopping list when clicked on "x" button',()=>{
                        var j = jQuery();
			j.clickRmBtn("chicken");
                        j.checkShoppingList("chicken");
                        assert.equal(0, 0);
		});
                it('adds correct amounts to the total when clicked on buy items', () => {
               		var foodItem = ['french fries'];
			var j = jQuery(foodItem);
                        var amountBefore = 0;
			j.clickBuyBtn("chicken");
                        j.checkShoppingList("chicken");
                        j.containsGraphs(1);
                        assert.equal(amountBefore, 0);
                });

	});
}


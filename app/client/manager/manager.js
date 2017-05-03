/**
 * Authors - Mit, Raj, Prabhjot, Nill, Dylan, Mouli
 * Project Website - https://github.com/Mitbits/Software-Project
 */


import { ReactiveVar } from 'meteor/reactive-var';

import { MenuItems, MenuItem } from '../../imports/api/menuItem.js';
import { popularItem } from '../../imports/api/mealSuggestions.js';

var itemRank = 0 ;
var rvItemRank = new ReactiveVar();

var itemName = 0;
var rvItemName = new ReactiveVar();

var itemProfit =0;
var rvItemProfit = new ReactiveVar();

var itemCost =0;
var rvItemCost = new ReactiveVar();

var itemRevenue =0;
var rvItemRevenue = new ReactiveVar();

Template.itemRow.events({
    /**
     * @function click .particularItem
     * @summary This function is used to extract menuItem details for the particular menuItem clicked on by the user
     */
    'click .particularItem'(){
        document.getElementById("itemToDisplay").className = "card-info card-section displayBlock";

        itemName = this.itemName;
        rvItemName.set(itemName)

        itemRank = this.itemPopularity;
        rvItemRank.set(itemRank);

        itemProfit = popularItem.findOne({menuItemID: this.itemID}).profit;
        itemCost = popularItem.findOne({menuItemID: this.itemID}).cost;
        itemRevenue = popularItem.findOne({menuItemID: this.itemID}).revenue;

        if(itemProfit<10 && itemProfit > 1) {
            itemProfit = itemProfit.toPrecision(3);
            itemProfit = parseFloat(itemProfit);
        }
        else if( itemProfit < 1) {
            itemProfit = itemProfit.toPrecision(2);
            itemProfit = parseFloat(itemProfit);
        }
        else if(itemProfit > 10) {
            itemProfit = itemProfit.toPrecision(4);
            itemProfit = parseFloat(itemProfit);
        }
/////////////////////////////////
        if(itemCost<10 && itemCost > 1) {
            itemCost = itemCost.toPrecision(3);
            itemCost = parseFloat(itemCost);
        }
        else if( itemCost < 1) {
            itemCost = itemCost.toPrecision(2);
            itemCost = parseFloat(itemCost);
        }
        else if(itemCost > 10) {
            itemCost = itemCost.toPrecision(4);
            itemCost = parseFloat(itemCost);
        }

////////////////////////////////

        if(itemRevenue<10 && itemRevenue > 1) {
            itemRevenue = itemRevenue.toPrecision(3);
            itemRevenue = parseFloat(itemRevenue);
        }
        else if( itemCost < 1) {
            itemRevenue = itemRevenue.toPrecision(2);
            itemRevenue = parseFloat(itemRevenue);
        }
        else if(itemCost > 10) {
            itemRevenue = itemRevenue.toPrecision(4);
            itemRevenue = parseFloat(itemRevenue);
        }


        rvItemProfit.set(itemProfit);
        rvItemCost.set(itemCost);
        rvItemRevenue.set(itemRevenue);

    }
});

Template.menuSuggestions.helpers({
    /**
     * @function itemsExclusive
     * @summary Returns all the menu items in the exclusive category
     */
    itemsExclusive(){
        return MenuItem.find({itemPopularity: 0});
    },
    /**
     * @function itemsHigh
     * @summary Returns all the menu items in the high category
     */
    itemsHigh(){
        return MenuItem.find({itemPopularity: 1});
    },
    /**
     * @function itemsMedium
     * @summary Returns all the menu items in the medium category
     */
    itemsMedium(){
        return MenuItem.find({itemPopularity: 2});
    },
    /**
     * @function itemsLow
     * @summary Returns all the menu items in the low category
     */
    itemsLow(){
        return MenuItem.find({itemPopularity: 3});
    },
    /**
     * @function itemsRank
     * @summary Returns the rank of each respective menu item
     */
    itemRANK() {
        let rank;
        if(rvItemRank.get() == 0) {
            rank = "Exclusive";
            return rank;
        }
        else if(rvItemRank.get() == 1){
            rank = "High";
            return rank;
        }
        else if(rvItemRank.get() == 2){
            rank = "Medium";
            return rank;
        }
        else if(rvItemRank.get() == 3){
            rank = "Low";
            return rank;
        }
    },
    /**
     * @function itemsExclusive
     * @summary Returns all the menu items names to be printed on the webpage
     */
    itemNAME(){
        return (rvItemName.get());
    },
    /**
     * @function itemsExclusive
     * @summary Returns the profit of each menu item
     */
    itemPROFIT(){
        return(rvItemProfit.get());
    },
    /**
     * @function itemsExclusive
     * @summary Returns the cost of making each menu item
     */
    itemCOST(){
        return(rvItemCost.get());
    },
    /**
     * @function itemsExclusive
     * @summary Returns the revenue of each menu item
     */
    itemREVENUE(){
        return(rvItemRevenue.get());
    }

});


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
    'click .particularItem'(){
        document.getElementById("itemToDisplay").className = "card-info card-section displayBlock";

        itemName = this.itemName;
        rvItemName.set(itemName)

        itemRank = popularItem.findOne({menuItemID: this.itemID}).rank;
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

Template.manager.helpers({
    itemsExclusive(){
        return MenuItem.find({itemPopularity: 0});
    },
    itemsHigh(){
        return MenuItem.find({itemPopularity: 1});
    },
    itemsMedium(){
        return MenuItem.find({itemPopularity: 2});
    },
    itemsLow(){
        return MenuItem.find({itemPopularity: 3});
    },
    itemRANK() {
        return (rvItemRank.get());
    },
    itemNAME(){
        return (rvItemName.get());
    },
    itemPROFIT(){
        return(rvItemProfit.get());
    },
    itemCOST(){
        return(rvItemCost.get());
    },
    itemREVENUE(){
        return(rvItemRevenue.get());
    }



});


import { MenuItems, MenuItem } from '../../imports/api/menuItem.js';
import { ReactiveVar } from 'meteor/reactive-var';

var cookTime = 0 ;
var rvCookTime = new ReactiveVar();

Template.itemRow.events({

    'click .particularItem'(){
        document.getElementById("itemToDisplay").className = "card-info card-section displayBlock";
        cookTime = this.cookTime;
        rvCookTime.set(cookTime);
    }

})

Template.manager.helpers({

    items(){
        return MenuItem.find({});
    },
    cookTIME() {
        return (rvCookTime.get());
    }


})


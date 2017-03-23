import { Mongo } from 'meteor/mongo';
import {Class, Enum} from 'meteor/jagi:astronomy';

export const MenuItems = new Mongo.Collection('menuitems');


export const MenuItem = Class.create({

    name: 'MenuItem',
    collection: MenuItems,
    fields: {
        itemName: String,
        //ingredients: String



    }


})


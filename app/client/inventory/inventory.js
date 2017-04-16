import { MenuItem, MenuItems } from '../../imports/api/menuItem.js';


var shoppingList = [];
var inventoryItem;
var i = 0;
var totalCost = 0.00;
// function createShoppingList(itemName,itemQuantity,itemPrice) {
//
// };
Template.inventoryPage.events({
    'click #inventoryPlus' () {
        $('#addIngredientModal')
            .modal('show')
        ;
    },
    'click #buyMore' () {
        inventoryItem = {
            name: this.itemName,
            quantity: 1,
            price: this.itemPrice,
            units: 1
        };

        shoppingList.push(inventoryItem);
        //var html = document.getElementById("shoppingTbl").innerHTML;
            html+="<tr>";
            html+="<td><i class='remove icon link'></i></td>";
            html+="<td>"+shoppingList[i].name+"</td>";
            html+="<td class='center'> <div class='ui transparent mini input' id='miniInput'> <input type='text' placeholder='###'> </div> </td>";
            html+="<td class='center'>$ "+shoppingList[i].price+"</td>";
            html+="</tr>";
            totalCost+= shoppingList[i].price;
            i++;

        //console.log(document.getElementById("shoppingTbl").innerHTML);
        document.getElementById("shoppingTbl").innerHTML = html;
        document.getElementById("totalCost").innerHTML = "$ " + totalCost;
       // Template.inventoryPage.__helpers.get('totalCost')();
        //console.log(shoppingList);




    }
})



/* Inventory.js */

Template.inventoryPage.helpers({
    ingredients() {
        console.log(MenuItems.find({}));
        return MenuItems.find({});
    },
    totalCost() {

    },

})


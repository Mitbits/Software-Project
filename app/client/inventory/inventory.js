import { MenuItem, MenuItems } from '../../imports/api/menuItem.js';
import { inventoryItems, inventoryItem} from '../../imports/api/ingredient.js';


var shoppingList = [];
var inventoryItem1;
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
        inventoryItem1 = {
            id: this.invID,
            name: this.invName,
            quantity: this.invPerUnit,
            price: this.invPrice,
        };

        shoppingList.push(inventoryItem1);
        //var html = document.getElementById("shoppingTbl").innerHTML;
            console.log(shoppingList[i].id);
            html+="<tr id='"+shoppingList[i].id+"'>";
            html+="<td><i class='remove icon link'></i></td>";
            html+="<td>"+shoppingList[i].name+"</td>";
            html+="<td class='center'> <div class='ui transparent mini input' id='miniInput'> <input type='text' value='"+shoppingList[i].quantity+"'></div> </td>";
            html+="<td class='center'>$ "+shoppingList[i].price+"</td>";
            html+="</tr>";
            totalCost+= shoppingList[i].price;
            i++;


        //console.log(document.getElementById("shoppingTbl").innerHTML);
        document.getElementById("shoppingTbl").innerHTML = html;
        document.getElementById("totalCost").innerHTML = "$ " + totalCost;
       // Template.inventoryPage.__helpers.get('totalCost')();
        //console.log(shoppingList);
    },
    'click .remove.icon.link' () {
        // pos = $(this).attr("id");
        //     console.log(pos);

    }


})



/* Inventory.js */

Template.inventoryPage.helpers({
    ingredients() {
        console.log(inventoryItems.find({}));
        return inventoryItems.find({});
    },
    totalCost() {

    },

})


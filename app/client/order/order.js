import '../../imports/api/orders.js';
import '../../imports/api/menuitems';
import { Orders, ORDER_TYPE } from '../../imports/api/orders.js';
import { MenuItems} from '../../imports/api/menuitems';

Template.orderQueue.helpers({
	templateGestures: {
		'doubletap div div#hammertap': function(event, templateInstance) {
			var $deleteObj = $(event.target.parentNode);
			$deleteObj.fadeOut("slow", function() {
				$(this).remove();
			});
		}
	},
	'orders': function() {
		//console.log(Orders.find());
		return Orders.find({});

	},
});

Template.orderRow.helpers({
	'orderTypeResolved': function(orderTypeNumber) {
		console.log(ORDER_TYPE.getIdentifier(orderTypeNumber));
		return ORDER_TYPE.getIdentifier(orderTypeNumber);
	}
})


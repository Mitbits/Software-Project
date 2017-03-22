import '../../imports/api/orders.js';
import { Orders } from '../../imports/api/orders.js';

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


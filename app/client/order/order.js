/**
 * Created by mitpatel on 3/16/17.
 */
 Template.orderQueue.helpers({
   templateGestures: {
     'doubletap div div#hammertap': function(event, templateInstance) {
       var $deleteObj = $(event.target.parentNode);
       $deleteObj.fadeOut("slow", function() {
         $(this).remove();
       });
     }
   }
 });

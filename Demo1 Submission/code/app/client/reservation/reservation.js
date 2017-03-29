
import {Reservations} from '../../imports/api/reservation.js';
import { Reservation } from '../../imports/api/reservation.js';
import { TableCluster } from '../../imports/api/table.js';

export const temp = Template.reservationPage;
Template.reservationPage.events({
/**
* @function
* @name click .plus.icon.link 
* @summary Increments count by 1 with maximum of 4
*/
    'click .plus.icon.link' () {
        let count = document.getElementById("count");
        maxCount = 4;
        if(count.innerHTML >= 1 && count.innerHTML < maxCount) {
            document.getElementById("minus").className = "big minus icon link";
            count.innerHTML++;
        }
        else {
            document.getElementById("plus").className = "big disabled plus icon link";
        }
    },
/**
* @function
* @name click .minus.icon.link 
* @summary Decrements count by 1 with minimum of 1
*/
    'click .minus.icon.link' () {
        let count = document.getElementById("count");
        if(count.innerHTML > 1 && count.innerHTML <= maxCount) {
            document.getElementById("minus").className = "big minus icon link";
            document.getElementById("plus").className = "big plus icon link";
            count.innerHTML--;
        } else {
            document.getElementById("minus").className = "big disabled minus icon link";
        }
    },
/**
* @function
* @name submit form 
* @param {event}
* @summary Obtains all Elements from reservation page and assigns them into reserve. reserve is then pushed into the database as a reservation.
*/
    'submit form': function(event){
	    console.log(new Date());
        event.preventDefault();
        var FirstName = document.getElementById('firstName').value;
        var LastName = document.getElementById('lastName').value;
        var PhoneNum = document.getElementById('phoneNum').value;
        var Email = document.getElementById('email').value;
        var Seats = document.getElementById("count").innerHTML;
        var date = document.getElementById('date-time').value;
        //var Time
        console.log(FirstName, LastName, PhoneNum, Email, Seats, date);
	//fetch table clust of given size and check if res can be added
	var tc = TableCluster.findOne({"size": Seats*1});
	if(!tc.checkValidReservation(new Date(date))){
		alert("Not enough tables");
		return;
	}
	//construct res
	var reserve = new Reservation({
		"firstName": FirstName,
	    "lastName": LastName,
	    "phoneNum": PhoneNum*1,
	    "email": Email,
	    "seats": Seats*1,
	    "date": new Date(date),

		});
	reserve.sssave();
	tc.pushReservation(reserve);
     window.location.href = 'Success';
	
	
    
    }

});
/**
* @function
* @name reservations 
* @summary Returns all Reservations from the database
* @returns Reservation Collection
*/ 
Template.reservationPage.helpers({
    reservations() {
        return Reservations.find({});
    },
});


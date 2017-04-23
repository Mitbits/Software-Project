
import {Reservations, Reservation} from '../../imports/api/reservation.js';
import { TableManager } from '../../imports/api/table.js';
import {ArchivedReservation, ArchivedReservations} from '../../imports/api/data/reservation.js'
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
* @param event
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
	var manager = TableManager.findOne({});
    /*
	if(!manager.verifyReservation(new Date(date))){
		alert("Not enough tables");
		return;
	}*/
		
	var arcRes = ArchivedReservation.findOne({
		'date' : parseInt(new Date(date).getHours())

	 });
	 console.log(arcRes);
	 if(arcRes){
		 arcRes.count+=1;
		 arcRes.reservation_save();
	 } else{
		console.log(parseInt(new Date(date).getHours()));
		console.log(new Date(date));
		console.log((new Date(date)).getHours());
		var ares = new ArchivedReservation({
			'date': parseInt(new Date(date).getHours()),
			'count': 1

		});
		 ares.arcres_save();
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

	reserve.reservation_save();
	manager.pushReservation(reserve);
    //window.location.href = 'Success';

    //window.location.href = 'Success';
	var day = reserve.date.getDate();
	var month = reserve.date.getMonth()+1;
	var year = reserve.date.getFullYear();
	var datee = month + "/" + day + "/" + year;
	var hours = reserve.date.getHours() > 12 ? reserve.date.getHours() - 12 : reserve.date.getHours();
	var ampm = reserve.date.getHours() >= 12 ? "P.M." : "A.M.";
	hours = hours < 10 ? "0" + hours : hours;
	var minutes = reserve.date.getMinutes() < 10 ? "0" + reserve.date.getMinutes() : reserve.date.getMinutes();
	var reservationTime = hours + ":" + minutes + " " + ampm;   

    var emailData = {
        name: FirstName,
        date: datee,
		time: reservationTime,
        seats: Seats*1
    }
	
	
	var subj = "Reservation"; 	
	var toAddr = Email;
	//var body = "Hello " + FirstName + "\n\nYour reservation has been confirmed for " + date + " For a Table of " + Seats*1 + " \nSee you there!";
	Meteor.call('sendEmail',Email,subj,emailData);

	
	
    
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


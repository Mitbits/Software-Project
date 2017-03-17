
import {Reservations} from '../../imports/api/reservation.js';

Template.reservationPage.events({

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
    'submit form': function(event){
        event.preventDefault();
        var FirstName = document.getElementById('firstName').value;
        var LastName = document.getElementById('lastName').value;
        var PhoneNum = document.getElementById('phoneNum').value;
        var Email = document.getElementById('email').value;
        var Seats = document.getElementById("count").innerHTML;
        var Date = document.getElementById('date-time').value;
        //var Time
        console.log(FirstName, LastName, PhoneNum, Email, Seats, Date);
        Reservations.insert({
            firstName: FirstName,
            lastName: LastName,
            phoneNum: PhoneNum,
            email: Email,
            seats: Seats,
            date: Date,
        });
        window.location.href = 'Success';

    }
});

Template.reservationPage.helpers({
    reservations() {
        return Reservations.find({});
    },
});
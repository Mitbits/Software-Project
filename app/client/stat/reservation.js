
import {createChart} from './chart.js';
import {ArchivedReservation} from '../../imports/api/data/reservation.js'


Template.reservations.helpers({
	reservationBarChart: function(){
		var reservationsData =[]

		ArchivedReservation.find({}).forEach(function (a){
			reservationData.push(a);
		});
				
		createChart({data: reservationsData,
				x:'hour',
				y:'Number of Reservation',
				selection:'#reservationChart'
		});

	
	
	}	


});

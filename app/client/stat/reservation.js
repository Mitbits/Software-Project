
import {createChartSingleY} from './chart.js';
import {ArchivedReservations} from '../../imports/api/data/reservation.js'


Template.reservations.helpers({
	reservationBarChart: function(){
		var reservationsData =[]

		ArchivedReservations.find({}).forEach(function (a){
			reservationsData.push(a);
		});
		console.log(reservationsData);	
		createChartSingleY({data: reservationsData,
				x:'Hour',
				y:'Count',
				selection:'#reservationChart'
		});

	
	
	}	


});

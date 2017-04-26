

import { Meteor } from 'meteor/meteor';
import {Table,TableStatus,TableType,TableCluster,TableManager} from '../../table.js';
import {assert } from 'meteor/practicalmeteor:chai';
import {Reservation} from '../../reservation.js';

if (Meteor.isServer) {
	describe('Table', () => {
		describe('methods', () =>{


			beforeEach(() => {;
				Table.remove({});
				Reservation.remove({});

				var table_entry = new Table({
					"table_id": 1,
					"size": 4,
					"occupants" : 0,
					"table_status": TableStatus.CLEAN,
					"table_type": TableType.RESERVATION,
					"reservation_intv":1,
					"converted" : false,
					"billPaid"	: false,
				});
				table_entry.save();
				new TableManager({}).save();

			}),
			it('can remove a reservation', () => {
				var reservation = new Reservation({
					'firstName': "Bob",
					'lastName' : "Sam",
					'phoneNum' :  1234567890,
					'email'    :  "lol@lol.com",
					'seats'    :  4,
					'date'     : new Date('03/22/2017 4:00 PM'),
				});
				reservation.save();
				TableManager.findOne({}).pushReservation(reservation);
				var table = Table.findOne({'table_id':1});
				table.reservation = reservation;
				table.save();
				table.clean();
				table = Table.findOne({'table_id':1});
				assert.equal(table.reservation,null);
			}),
			it('can update its table status',() =>{

				var table = Table.findOne({'table_id':1});
				assert.equal(table.table_status,TableStatus.CLEAN);
				table.updateTableStatus(TableStatus.DIRTY);

				table = Table.findOne({'table_id':1});

				assert.equal(table.table_status,TableStatus.DIRTY);


			}),
			it('can update its occupants and check them',()=> {
				var table = Table.findOne({'table_id':1});
				assert.equal(table.occupants,0);
				table.setOccupantLimit(4);
				table = Table.findOne({'table_id':1});
				assert.equal(table.getNumOccupants(),4);
			});
		});
	}),
	describe('TableCluster/Table/Reservation Integration tests', ()=>{
		describe('methods', ()=>{
			beforeEach(()=>{
				Reservation.remove({});
				Table.remove({});
				TableManager.remove({});
				new TableManager({}).save();
				var reservation = new Reservation({
					'firstName': "Bob",
					'lastName' : "Sam",
					'phoneNum' :  12,
					'email'    :  "lol@lol.com",
					'seats'    :  4,
					'date'     : new Date(),
				});
				reservation.save();
				var table_entry = new Table({
					"table_id": 1,
					"size": 4,
					"occupants" : 0,
					"table_status": TableStatus.CLEAN,
					"table_type": TableType.RESERVATION,
					"reservation_intv":1,
					"converted" : false,
					"billPaid"	: false,
				});
				table_entry.save();



			}),
			it('can add a reservation to the wait queue', ()=>{
				var reservation = Reservation.findOne({'phoneNum':12});
				var tablemanager = TableManager.findOne({});
				assert.equal(tablemanager.reservations.length,0);
				tablemanager.pushReservation(reservation);
				tablemanager = TableManager.findOne({});
				assert.equal(tablemanager.reservations.length,1);
				assert.equal(tablemanager.reservations[0].phoneNum,12);
				
			}),
			it('can pop a reservation from its wait queue', ()=>{
				var reservation = Reservation.findOne({'phoneNum':12});
				var tablemanager = TableManager.findOne({});
				tablemanager.pushReservation(reservation);
				tablemanager = TableManager.findOne({});
				assert.equal(tablemanager.reservations.length,1);
				tablemanager.popReservation(reservation);
				tablemanager = TableManager.findOne({});
				assert.equal(tablemanager.reservations.length,0);
			}),
			it('can reserve a table for a customer', () => {
				var tablemanager = TableManager.findOne({});
				var reservation = Reservation.findOne({'phoneNum':12});
				tablemanager.pushReservation(reservation);
				tablemanager = TableManager.findOne({});
				tablemanager.startPollReservations();

				Meteor._sleepForMs(1500);
				reservation = Reservation.findOne({'phoneNum':12});
				assert.equal(reservation.assigned,true);

			}),
			it('can test for a valid reservation', ()=>{
				var tablemanager = TableManager.findOne({});
				var reservation = Reservation.findOne({'phoneNum':12});
				var ret = tablemanager.verifyReservation(reservation.date);
				assert.equal(ret,true);

				tablemanager.pushReservation(reservation);
				var new_reservation = new Reservation({
					'firstName': "Bob",
					'lastName' : "Sam",
					'phoneNum' :  12,
					'email'    :  "lol@lol.com",
					'seats'    :  4,
					'date'     : reservation.date,

				});
				new_reservation.save();
				ret = tablemanager.verifyReservation(new_reservation.date);
				assert.equal(ret,false);

			});
		});
	});

}

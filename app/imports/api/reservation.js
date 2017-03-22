import { Mongo } from 'meteor/mongo';

export const Reservations = new Mongo.Collection('reservations');

Reservations.insert({
            firstName: FirstName,
            lastName: LastName,
            phoneNum: PhoneNum,
            email: Email,
            seats: Seats,
            date: Date,
        });


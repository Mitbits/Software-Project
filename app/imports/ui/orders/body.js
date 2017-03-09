import { Template } from 'meteor/templating';
 
import { Tasks } from '.../api/orders.js';
 
import './body.html';
 
Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});
import { CountDownTimer } from './CountDownTimer.js';
import { Template } from 'meteor/templating';
import { Order, Orders } from '../../imports/api/order.js';
import '../../imports/api/priorityManager.js';
import { PriorityManager } from '../../imports/api/priorityManager.js';

Template.orderQueue.helpers({
	templateGestures: {
		'tap div div#hammertap': function(event, templateInstance) {
			// check if user clicked on the buttons
			console.log(event.target.id);
			var id = event.target.id;
			if(id == 'done-btn' || id == 'done-btn-icon') {
				addButtonHandler(event, templateInstance);
				return;
			} else if(id == 'add-time-btn' || id == 'add-time-icon') {
				addTimeHandler(event, templateInstance);
				return;
			}

			var $colorObj = $(event.target.parentNode);
			var classesApplied = $colorObj.attr('class');
			var isActive = classesApplied.includes('active');
			var $addTimeBtn = $colorObj.find('#add-time-btn');
			
			if(isActive) { //change it to normal- white
				$colorObj.removeClass('active');
				$colorObj.addClass('white');
				$addTimeBtn.addClass('disabled');
				resetTimer(event);
			} else {
				$colorObj.removeClass('white');
				$colorObj.addClass('active');
				$addTimeBtn.removeClass('disabled');
				startTimer(event);
			}
		}
	},
	orders() {
		console.log(PriorityManager.start());
		return PriorityManager.start();

	}
});

var timer;

var addButtonHandler = function(event, templateInstance) {
	var $selectedObj = $(event.target);
	var $deleteObj = $selectedObj.closest('#hammertap');
	$deleteObj.fadeOut('slow', function() {
		$(this).remove();
	});
}

var deltaTime = 30;
var addTimeHandler = function(event, templateInstance) {
	var { timeMin, timeSec, timeText, $timeObj } = getTime(event);
	var duration = 60*timeMin + timeSec + deltaTime;
	resetTimer(event);
	startCountDown($timeObj, duration, timeText);
}

var startTimer = function(event) {
	var {timeMin, timeSec, timeText, $timeObj} = getTime(event);
	var duration = 60*timeMin + timeSec;
	console.log(typeof timeMin);
	console.log(duration);
	$timeObj.text(1 + ":" + 23);
	startCountDown($timeObj, duration, timeText);
}

var getTime = function(event) {
	var $selectedObj = $(event.target);
	var $timeObj = $selectedObj.closest('#hammertap').find('#time');
	var timeText = $timeObj.text();
	var timeMin = 1*timeText.substring(0, timeText.indexOf(':'));
	var timeSec = 1*timeText.substring(timeText.indexOf(':')+1);
  console.log(timeMin);
  console.log(timeSec);
  return {timeMin, timeSec, timeText, $timeObj};
}

var startCountDown = function($timeObj, duration, resetTimeText) {
	timer = new CountDownTimer(duration, 1000);
	//alert(duration);
	console.log($timeObj);
	timer.onTick(function(min, sec, reset) {
		$timeObj.text(min + ":" + sec);
		if(reset) { // reset timer
			$timeObj.text(resetTimeText);
		}
	});
  timer.start();
}

var resetTimer = function(event) {
	var $selectedObj = $(event.target);
	var $timeObj = $selectedObj.closest('#hammertap').find('#time');
	timer.resetTimer();
}

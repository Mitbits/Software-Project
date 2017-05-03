iRestaurant: A simple restaurant automation and optimization software.
Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
Project Website: https://github.com/Mitbits/Software-Project

1.	Installation Instructions

	For a visual guide on how to setup the project environment and run our code, please visit
	https://github.com/Mitbits/Software-Project. If you do not have Internet access, you will
	find a basic text version of the installation instructions in the current folder.
	
2.	Directory Tree

+ README.txt : Basic information about the contents of the electronic archive.
+ Installation.txt : Offline instructions for running the software.
- doc : Relevant documents to the project
	+ Demo_01_Slides : The presentation slides used for Demo 1
	+ Group_02_Report1_Full : The submitted version of Report 2 (Full)
	+ Group_02_Report2_Full : The submitted version of Report 2 (Full)
- code
	- app
		- client
			- floorPlan
				+ floorplan.css
				+ floorplan.html
				+ floorplan.js
			- inventory
				+ inventory.css : The stylesheet for the inventory page
				+ inventory.html : HTML Page for inventory
				+ inventory.js: JavaScript for inventory including all the functions
			- lib
			- Login
				+ login.css
				+ loginJS.js
				+ loginTemplate.html
			- manager
				+ manager.css
				+ manager.html
				+ manager.js
			- order
				+ CountDownTimer.js
				+ order.css
				+ order.html
				+ order.js
			- reservation
				+ reservation.css : The stylesheet for the reservation page
				+ reservation.html : HTML page for reservation
				+ reservation.js : JavaScript for reservation page including function
				+ reservationSuccess.html : HTML page for reservation success
			- stat
				+ archive.html
				+ archive.js
				+ billing.html
				+ billing.js
				+ chart.js
				+ d3_timeseries.css
				+ d3_timeseries.js
				+ general.html
				+ general.js
				+ kitchen.html
				+ kitchen.js
				+ reservation.html
				+ stat.css
				+ stat.html
				+ stat.js
			- waiter
				+ waiter.css : Stylesheet for waiter interface
				+ waiter.html : HTML page for waiter interface
				+ waiter.js : JavaScript code for waiter interface including functions
			+ favicon
			+ main.css
			+ main.html
			+ main.js
		- imports
			- api
				- data
					+ avgCookTime.js
					+ avgIngUsage.js
					+ avgNumOrders.js
					+ avgTimeSpent.js
					+ popularItems.js
					+ reservation.js
				- test
					- client
						+ client.tests.js
						+ jquery.js
						+ stats.tests.js
					- server
						+ order.tests.js
						+ priorityMangager.tests.js
						+ table.tests.js
			+ billJS.js
			+ ingredient.js : Inventory Item class which is saved in a mongoDB database at the beginning of the application
			+ mealSuggestions.js
			+ menuItem.js : MenuItem class which is saved in a mongoDB database at the beginning of the application
			+ order.js
			+ priorityManager.js
			+ reservation.js : reservation class which is saved in a mongoDB database when a customer makes a reservation
			+ table.js
		- lib
		- private
			+ debug.log
			+ reservation-email.html
		- server
			+ dataDriver.js
			+ inventory.json
			+ main.js : contains all the code the application needs to run on startup to make sure the application is working properly
			+ menuItems.json
			+ MenuItems.txt
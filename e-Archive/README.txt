iRestaurant: A simple restaurant automation and optimization software.
Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
Project Website: https://github.com/Mitbits/Software-Project

1.	Installation Instructions

	For a visual guide on how to setup the project environment and run our code, please visit
	https://github.com/Mitbits/Software-Project. If you do not have Internet access, you will
	find a basic text version of the installation instructions in the current folder.
	
2.	Unit and Integration Test Instructions (Client and Server)
	
	The instructions to run the tests are located in a separate file: ./code/app/READMETest.txt
	
3.	Directory Tree

+ README.txt : Basic information about the contents of the electronic archive.
+ Installation.txt : Offline instructions for running the software.
- doc : Relevant documents to the project
	+ Demo_01_Slides : The presentation slides used for Demo 1
	+ Group_02_Report1_Full : The submitted version of Report 2 (Full)
	+ Group_02_Report2_Full : The submitted version of Report 2 (Full)
- design
	+ Diagrams.zip : ZIP archive of relevant diagram images
- code
	- app
		- client
			- floorPlan
				+ floorplan.css
				+ floorplan.html
				+ floorplan.js
			- inventory
				+ inventory.css
				+ inventory.html
				+ inventory.js
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
				+ CountDownTimer.js : Handles counters for order queue
				+ order.css :  Configures styles for order queue UI
				+ order.html : Displays order queue and relevant data
				+ order.js : Controls client side order queue logic
			- reservation
				+ reservation.css
				+ reservation.html
				+ reservation.js
				+ reservationSuccess.html
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
				+ waiter.css
				+ waiter.html
				+ waiter.js
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
			+ billJS.js : Server side class and database setup for billItems and bill
			+ ingredient.js : Server side class and database setup for ingredients
			+ mealSuggestions.js : Server side class and database setup for popularItems
			+ menuItem.js : Server side class and database setup for menuItems
			+ order.js : Server side class and database setup for order and orderItems
			+ priorityManager.js : Server side class and database setup for priority manager
			+ reservation.js : Server side class and database setup for reservation
			+ table.js : Server side class and database setup for table
		- lib
		- private
			+ debug.log
			+ reservation-email.html
		- server
			+ dataDriver.js
			+ inventory.json
			+ main.js
			+ menuItems.json
			+ MenuItems.txt
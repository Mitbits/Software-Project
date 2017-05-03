iRestaurant: A simple restaurant automation and optimization software.
Authors: Raj Patel, Mit Patel, Dylan Herman, Moulindra Muchumari, Prabhjot Singh, Nill Patel
Project Website: https://github.com/Mitbits/Software-Project

1.	Installation Instructions

	For a visual guide on how to setup the project environment and run our code, please visit
	https://github.com/Mitbits/Software-Project. If you do not have Internet access, you will
	find a basic text version of the installation instructions in the current folder.
	
2.	Unit and Integration Test Instructions (Client and Server)
	
	The instructions to run the tests are located in a separate file: ./code/app/READMETest.txt
	These instructions are an extension to the installation instructions. Therefore, make sure
	you learn how to run the project before attempting this.
	
3.	Directory Tree

+ README.txt : Basic information about the contents of the electronic archive.
+ Installation.txt : Offline instructions for running the software.
- doc : Relevant documents to the project
	+ Demo_01_Slides.pptx : The presentation slides used for Demo 1
	+ Group_02_Report1_Full.pdf : The submitted version of Report 1 (Full)
	+ Group_02_Report2_Full.pdf : The submitted version of Report 2 (Full)
	+ Group_02_Report3_Full.pdf : The submitted version of Report 3 (Full)
	+ Technical-Documentation-for-iRestaurant.pdf : Technical documentation for the software (Final)
- design
	+ Diagrams.zip : ZIP archive of relevant diagram images
- code
	- app
		- client
			- floorPlan
				+ floorplan.css: Stylesheet for the floor plan page
				+ floorplan.html: Floorplan HTML page housing the tables
				+ floorplan.js: JavaScript for the floorplan page with all the functions
			- inventory
				+ inventory.css : The stylesheet for the inventory page
				+ inventory.html : HTML Page for inventory
				+ inventory.js: JavaScript for inventory including all the functions
			- lib : libraries used by semantic
			- Login
				+ login.css: Stylesheet for the login page
				+ loginJS.js: JavaScript for the login page including all the functions
				+ loginTemplate.html: HTML page for the Login and Register page
			- manager
				+ manager.css: Stylesheet for the manager menu suggestions page
				+ manager.html: HTML Page for the manager to see menu suggestions
				+ manager.js: JavaScript page for the manager
			- order
				+ CountDownTimer.js : Handles counters for order queue
				+ order.css :  Configures styles for order queue UI
				+ order.html : Displays order queue and relevant data
				+ order.js : Controls client side order queue logic
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
			+ favicon : favicon to display on the page
			+ main.css : main css file for the whole project
			+ main.html : main html file for the whole project
			+ main.js : main js file for the whole project
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
		- lib : library for semantic
		- private
			+ debug.log : log file for debugging
			+ reservation-email.html: email template for reservation confirmation
		- server
			+ dataDriver.js
			+ inventory.json : Json file for all the inventory items in our application
			+ main.js : contains all the code the application needs to run on startup to make sure the application is working properly
			+ menuItems.json : Json file for all the menu items in our application
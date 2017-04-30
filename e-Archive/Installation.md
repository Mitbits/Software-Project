# Installation Instructions  
## Table of Contents  
1. Prerequesites
2. Retrieving Project Files 
3. Installing Packages
4. Running the Application  

## 1. Prerequesites
* [Node.js](https://nodejs.org/en/download/)
* [Meteor](https://www.meteor.com/install)
* [Git](https://git-scm.com/downloads)
  
## 2. Retrieving Project Files
Clone the project files using Git via your native CLI.  
`git clone https://github.com/Mitbits/Software-Project.git`  
  
![Successful clone of the repository](https://i.gyazo.com/e69f3d3ca169a9d1ab6f7ac972a81329.png)
  
  
## 3. Installing Packages  
Navigate to the application folder  
`cd Software-Project/app`  

Meteor will automatically download required packages based on the project configuration.  
`meteor npm install`  
  
During the installation Meteor will prompt you to configure the package `semantic-ui`. Follow the screenshots below to properly configure the package.  

Select: _Yes, extend my current settings_  
![semantic-ui step 1](https://i.gyazo.com/1fe3643fc9f2209361c28996ec1d4bc9.png)  
  
Select: _Automatic (Use default locations and all components)_   
![semantic-ui step 2](https://i.gyazo.com/6432248049f53c09936b311bf898a020.png)  
  
Select: _Yes_  
![semantic-ui step 3](https://i.gyazo.com/8a74f5e96a8797f9a9874e43df9b5971.png)  
  
Input: `/node_modules` where to put Semantic UI in the project  
![semantic-ui step 4](https://i.gyazo.com/739e435c0aecc65b66ced1891314e437.png)  
  
**On installation success, Meteor will print a list of packages currently installed.  **

## 4. Running the Application 
Once Meteor is successfully configured, the application can be run via CLI.  
Navigate to the application folder  
`cd Software-Project/app`  
  
Run the application  
`meteor`  
  
On success, Meteor will indicate your application is running at: http://localhost:3000  
![success](https://i.gyazo.com/c970842a591bbc71a54fe53f9cf7d043.png)  
  
Navigate to http://localhost:3000 in a modern browser that supports JavaScript (_Google Chrome_ is recommended).
To run our code please follow the steps in this link:
https://github.com/Mitbits/Software-Project/wiki/1_code


Otherwise a text format of the link is below:

Clone the project files using Git via your native CLI.
git clone https://github.com/Mitbits/Software-Project.git


Navigate to the application folder
cd Software-Project/app

Meteor will automatically download required packages based on the project configuration.
meteor npm install

During the installation Meteor will prompt you to configure the package semantic-ui. Follow the instructions below to properly configure the package.

Select: Yes, extend my current settings

Select: Automatic (Use default locations and all components)

Select: Yes

Input: /node_modules where to put Semantic UI in the project

**On installation success, Meteor will print a list of packages currently installed. **

Once Meteor is successfully configured, the application can be run via CLI.
Navigate to the application folder:
cd Software-Project/app

Run the application
meteor

On success, Meteor will indicate your application is running at: http://localhost:3000
success

Navigate to http://localhost:3000 in a modern browser that supports JavaScript (Google Chrome is recommended).
##                                  Commenting System
---------------------------------------------------------------------------------------------------------------------------------

Before you begin make sure you have installed all of the following prerequisites on your development machine:

* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) 
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).


---------------------------------------------------------------------------------------------------------------------------------

Follwing are the steps of deploying the application on local machine

* Download the full rentomojo project in zip file 
* after completion of download unzip the file.
* open a terminal.
* Change the location of terminal to project folder useing cd Command.
* install the all dependencies using npm.

npm i 

following dependencies will going to install
    "Faker": "^0.7.2", 
    "axios": "^0.19.0", 
    "bcryptjs": "^2.4.3", 
    "body-parser": "^1.19.0",
    "concurrently": "^5.0.0",
    "delay": "^4.2.0",
    "express": "^4.17.1",
    "faker": "^4.1.0",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.15",
    "moment": "^2.24.0",
    "mongoose": "^5.7.7",
    "mongoose-unique-validator": "^2.0.3",
    "node-sass": "^4.13.0",
    "react": "^16.11.0",
    "react-dom": "^16.11.0",
    "react-redux": "^7.1.1",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.2.0",
    "react-thunk": "^1.0.0",
    "react-toastify": "^5.4.0",
    "redux": "^4.0.4",
    "redux-thunk": "^2.3.0",
    "save": "^2.4.0",
    "uuid": "^3.3.3",
    "validator": "^12.0.0"


after installing all dependencies run the " npm run dev " command on terminal,
it starts npm run backend ( to start backend server ) & npm start (to start react frontend server)

after starting both server 

open web browser and type http://localhost:3000 URL in url bar and press enter,

##                                                    Steps to use the comment system
---------------------------------------------------------------------------------------------------------------------------
Once you open the http://localhost:3000 on web browser it opens the Comment system app login & register page,
first time you need to register your self as a user, useing username , email ,password field .
after successfully register login the registered user.
and start useing comment system ( you can reply any users comment ,and you can delete and update you own added comments )

##                                                    Folder Structure of the Project 
--------------------------------------------------------------------------------------------------------------------------
backend  --- contains all nodejs backend server code 
    config -- server config file
    db -- database config file
    middleware -- middlware functions ( tryCatch , error , userAuth)
    models -- contain mongoose schema files
    routes
        api -- backend API's files 
node_modules -- contains all installed dependencies
public -- react public folder ( react front will start excuting from here )
src 
    actions -- contains Redux Actions
    assets -- contain required imges for front end design
    components -- contains all react component
    reducers -- contains redux reducers

Server.js -- nodejs server starting file ,



##                        What i believe in Production Quality code                                       
--------------------------------------------------------------------------------------------------------------------------

Backend --


    1 . there should be configured logger to logs all error and API called,
    2 . Server side caching useing redis to boost the server performance,
    3 . Code should be tested using unit testing with maximum test cases before going to production.
    4 . Server should run with cluster mode.
    5 . Server should reload or restart after consuming max memory .
    6 . There should be satrtup script wich contains all production ENV .
    6 . before going to production should do the performance testing .

frontEnd --

    1 . before going to production code should tested with unit testing ,
    2 . Code should be builded.
    3 . there shouldn't be any memory leakage.



##                         please see the code comments
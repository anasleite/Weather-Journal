// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require ('body-parser');


/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*code bellow written based on excercise "Including Packages" (https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/214b1892-0246-4026-9926-71831d266f39)*/
const cors = require('cors');
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


/*code bellow written based on classroom "Creating a Local Server I" (https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/214b1892-0246-4026-9926-71831d266f39)*/

const port = 8000; 
// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}



/*Code bellow written based on Excercise "GET requests" (https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/b0d68e7d-274a-43ef-b3da-3cfe93a77961) */
// Initialize all route with a callback function
app.get('/all', sData);

// Callback function to complete GET '/all'
function sData (req, res){
    res.send(projectData);

}


/*Code bellow written based on Excercise "POST requests" (https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/0c75d5b8-3dde-4404-9552-c1c76c10b2ab) */
// Post Route
app.post('/addData', addData)
function addData (req, res){
    newEntry = {
        temperature: req.body.temp,
        date: req.body.date,
        userResponse: req.body.content
    }
    projectData.push(newEntry);
    res.send(projectData)
}

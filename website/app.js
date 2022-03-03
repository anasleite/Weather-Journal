
/* Global Variables */

//const { all } = require("express/lib/application");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API

const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const apiKey = '&appid=97083300665d16da00e0eea5ed60bea9&units=metric';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
//code bellow written based on: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/06b6f9e9-221f-4668-8d13-a70346b293d2 
//and https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/06b6f9e9-221f-4668-8d13-a70346b293d2

function performAction(){
    const zipCode =  document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL,zipCode, apiKey)
    .then (function(data){
            console.log("Add data from api: ", data);
            postData("/addData", {
                date: newDate, 
                temp: data.main.temp, 
                content: feelings});
        })
        .then(() => updateData());
    }

    /* Function to GET Web API Data*/
    const getWeather = async(baseURL, zipCode, apiKey)=>{

        const url = baseURL + zipCode + apiKey;
        const request = await fetch(url);
        try {
            const allData = await request.json();
            //console.log(allData)
            if (allData.message) {
                alert(allData.message);
            }else {
                return allData;
            }
        } catch(error) {
            console.log("error", error);
        }
    }

//code written based on excercise: "Async Function" (https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/91699e21-0fe8-48cf-a46e-e2b5c8e32fa4)
/* Function to POST data */
const postData = async (url='', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', credentials: 'same-origin', headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log ("error", error);
    }
};


//code written based on project rubric: https://review.udacity.com/#!/rubrics/4671/view and classroom: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/06b6f9e9-221f-4668-8d13-a70346b293d2
/* Function to GET Project Data */

const updateData = async () =>{
    const request = await fetch("/all");
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML = `${allData.date}`;
    document.getElementById('temp').innerHTML = `${allData.temp}+ 'degrees'`;
    document.getElementById('content').innerHTML = `${allData.content}`;
    
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
};

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(3000, () => console.log("Listening on port 3000..."));

app.get("/weather-object", (req, res) => {
  if (!projectData.temperature && !projectData.userResponse)
    res.status(400).send({ status: 400, error: "Fill in all the fields" });
  res.send(projectData);
});

app.post("/weather-object", (req, res) => {
  try {
    
    const {temperature, date, userResponse} = req.body;
    if (!temperature || !date || !userResponse) {
      return res.status(400).send({ status: 400, message: "temperature, date & userResponse are required!" });
    }
    projectData = {
      temperature,
      date,
      userResponse
    }
    return res.send(projectData);
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

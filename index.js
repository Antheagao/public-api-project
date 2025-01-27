import express from "express";
import axios from "axios";

// Declare and initialize variables
const app = express();
const port = 3000;
const API_KEY = PROCESS.ENV.API_KEY;
const API_URL = "https://api.weatherapi.com/v1/current.json";

// Set middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Send the homepage to a connected user
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL + `?key=${API_KEY}&q=auto:ip`);
        const result = response.data;

        res.render("index.ejs", {
            location: result.location.name, 
            temp: result.current.temp_f,
            condition: result.current.condition.text,
            wind: result.current.wind_mph,
            error: null,
        });
    } catch (error) {
        console.log("Failed to make request: ", error.message);
        res.render("index.ejs", {
            location: null, 
            temp: null,
            condition: null,
            wind: rnull,
        });
    }
});

// Check the weather from the user submission
app.post("/", async (req, res) => {
    const city = req.body.city;
    try {
        const response = await axios.get(API_URL + `?key=${API_KEY}&q=${city}`);
        const result = response.data;

        res.render("index.ejs", {
            location: result.location.name, 
            temp: result.current.temp_f,
            condition: result.current.condition.text,
            wind: result.current.wind_mph,
        });
    } catch (error) {
        console.log("Failed to get weather for city: ", error.message);
        res.render("index.ejs", {
            location: null, 
            temp: null,
            condition: null,
            wind: null,
            error: error.message,
        });
    }
});

// listen for incoming connections to server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

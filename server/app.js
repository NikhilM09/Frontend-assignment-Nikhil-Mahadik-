// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    const { stockSymbol, date } = req.body;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.polygon.io/v1/open-close/${stockSymbol}/${date}?adjusted=true&apiKey=${apiKey}`;

    axios
    .get(apiUrl)
    .then((response) => {
      // Handle the API response and send it back to the client
      const tradeData = response.data;
      console.log(tradeData,"trade data");
      res.status(200).json(tradeData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.sendStatus(500); // Send an error status code to the client
    });
    console.log("hello world");
    // res.sendStatus(200);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
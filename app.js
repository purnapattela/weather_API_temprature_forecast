let apiid = "enter api here"; //enter your api id here

/**
 * to generate api id go to https://openweathermap.org/
 * and create an account and get your api id
 * and put the apiid in about varibale apiid
 */

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
	let city = req.body.city;
	const endPoint =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&appid=" +
		apiid +
		"&units=standard";
	const url = https.get(endPoint, (response) => {
		response.on("data", (data) => {
			const weatherData = JSON.parse(data);
			let temp = weatherData.main.temp;
			res.send("<h1>Temprature is : " + temp + "</h1>");
		});
	});
});

app.listen(3000, () => {
	console.log("app is running on port 3000");
});

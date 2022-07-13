var express = require('express');
var router = express.Router();
const dashboardService = require("../services/dashboardService")
const axios = require("axios");

var cacheWeatherInfo = { icon: "", temp: "", lasDate: new Date().setTime(new Date() - (61 * 60 * 1000)) }


/* GET main page. */
router.get('/', async (req, res, next) => {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        let coutApprentices = await dashboardService.getCountApprentices();
        let countModifications = await dashboardService.getCountModifications();
        let lastestApprenticeship = await dashboardService.getCountLastestApprenticeship();
        let countApprendicesNearingLeave = await dashboardService.getCountApprendicesNearingLeave();

        let weatherInfo = await getWeatherInformation();

        let paramDay = getParamDay();

        res.render('main', { title: 'Main Page', isWithInterface: true, coutApprentices: coutApprentices.count, countModifications: countModifications.count, lastestApprenticeship: lastestApprenticeship.count, countApprendicesNearingLeave: countApprendicesNearingLeave.count, iconWeather: weatherInfo.icon, tempWeather: weatherInfo.temp, paramDay: paramDay });

    }


});

async function getWeatherInformation() {

    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
            q: 'Bogota,Co',
            lat: '1',
            lon: '0',
            id: '2172797',
            lang: 'null',
            units: 'metric'
        },
        headers: {
            'X-RapidAPI-Key': '8d97b17cfdmsh3c3ee6b058d9679p113b62jsn69dabeba8521',
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
    };

    let weatherInfo = { icon: "", temp: "" }

    let hourCacheWeather = new Date(cacheWeatherInfo.lasDate).getHours();
    let hourNow = new Date().getHours();

    if (hourCacheWeather < hourNow) {
        await axios.request(options).then(async function (response) {

            cacheWeatherInfo.icon = response.data.weather[0].icon;
            cacheWeatherInfo.temp = Math.ceil(response.data.main.temp) + 1
            cacheWeatherInfo.lasDate = new Date();

            console.log("Guarda en cache");

        }).catch(function (error) {
            console.error(error);
        });
    }

    weatherInfo.icon = cacheWeatherInfo.icon
    weatherInfo.temp = cacheWeatherInfo.temp

    return weatherInfo
}

function getParamDay() {
    let date = new Date()
    let hour = date.getHours()

    if (hour >= 23 || hour < 11) {
        return "bg-gradient-dark"
    } else {
        return "bg-gradient-primary"
    }
}

module.exports = router;

$(document).ready(function () {

    var apiKey = "9bd3bf6fe4a1fb99bfc30f6487a298d3";
    //  city = "Orlando, Florida"
    var city = "Orlando, Florida";
    // var city = "San Francisco"
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({

        url: queryURL,
        method: "GET"
    }).
        then(function (response) {


            console.log(response);
        });






});

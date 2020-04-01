$(document).ready(function () {


    // create a form and ask for the city name

    

    $("#getWeather").click(function (event) {

        event.preventDefault();

        var myCity = $("#searchInfo").val();
        console.log(myCity);
        ajaxCalls(myCity);

    })



    function ajaxCalls(city){

        var apiKey = "9bd3bf6fe4a1fb99bfc30f6487a298d3";
        //  city = "Orlando, Florida"

        // var city = "San Francisco"
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

        var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;


        // the temperature, => main temp
        // the humidity, => main humidity
        // the wind speed,  => wind
        // and the UV index  >> change colors  Lat and long
        var myTemperature;
        var myHumidity;
        var myWindSpeed;
        var myUvIndex;
        var myIcon;
        // http://openweathermap.org/img/wn/01d@2x.png
        var myLat;
        var myLon;
        
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).
            then(function (response) {
                console.log(response);

                myTemperature = response.main.temp;
                console.log(myTemperature)

                myHumidity = response.main.humidity;
                console.log(myHumidity)

                myWindSpeed = response.wind.speed;
                console.log(myWindSpeed)

                myLat = response.coord.lat;
                console.log(myLat)

                myLon = response.coord.lon;
                console.log(myLon)
                 
                myIcon = response.weather[0].icon;
                console.log(myIcon);
                
                var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?appid="+apiKey+"&lat="+myLat+"&lon="+myLon;


                $.ajax({
                    url: queryURLUV,
                    method: "GET"
                }).then(function(uvResponse){
                    console.log(uvResponse)
                    myUvIndex = uvResponse.value;
                })





            });



            $.ajax({
                url: queryURLForecast,
                method: "GET"

            }).then(function(data){

                // console.log(data)
               
                for(var i=0 ; i< data.list.length ; i++){
                    //var myHour = data.list[i].dt_txt;


                    if(data.list[i].dt_txt.indexOf("12:00:00")!== -1){
                        console.log(data.list[i]);

                        // create the structure dynamycaly 
                    }

                }

            })

    }



    


});

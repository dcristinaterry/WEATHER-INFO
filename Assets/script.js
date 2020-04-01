$(document).ready(function () {

    // const currentTime = new Date();

    // console.log('currentTime', currentTime);

    var currenTime = moment().format("(MM/DD/YYYY)")
    // var currentHour = moment().format('HH');
     console.log("current hour:   " + currenTime);
    // // create a form and ask for the city name


    //get last information


    $("#getWeather").click(function (event) {

        event.preventDefault();

        var myCity = $("#searchInfo").val();
        console.log(myCity);
        ajaxCalls(myCity);
        //add local storage
        // add to the buttons.
        

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
        $("#city").text(city + " " + currenTime);
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).
            then(function (response) {
                console.log(response);

                myTemperature = response.main.temp;
                $("#temperature").text("Temperature: " + myTemperature + " F");
                console.log(myTemperature)

                myHumidity = response.main.humidity;
                $("#humidity").text("Humidity: " + myHumidity + "%") ;
                console.log(myHumidity)

                myWindSpeed = response.wind.speed;
                $("#windspeed").text("Wind Speed: " + myWindSpeed +" MPH");
                console.log(myWindSpeed)

                myLat = response.coord.lat;
                console.log(myLat)

                myLon = response.coord.lon;
                console.log(myLon)
                 
                myIcon = response.weather[0].icon;
                var imageUrl = "http://openweathermap.org/img/wn/"+ myIcon + "@2x.png"
                $("#cityImage").attr("src", imageUrl);
                console.log(myIcon);


                var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?appid="+apiKey+"&lat="+myLat+"&lon="+myLon;


                $.ajax({
                    url: queryURLUV,
                    method: "GET"
                }).then(function(uvResponse){
                    console.log(uvResponse)
                    myUvIndex = uvResponse.value;

                    if(myUvIndex>7){
                        $("#uvvalue").addClass("uvred");
                    }
                    if(myUvIndex>2 && myUvIndex<8){
                        $("#uvvalue").addClass("uvyellow");
                    }
                    if(myUvIndex<3){
                        $("#uvvalue").addClass("uvgreen");
                    }
    
                    $("#uvvalue").text(myUvIndex);  
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

                    //    var div1 = $("<div>")
                    }

                }

            })


      






    }



    


});

$(document).ready(function () {

    // const currentTime = new Date();

    // console.log('currentTime', currentTime);

    var currenTime = moment().format("(MM/DD/YYYY)")
    // var currentHour = moment().format('HH');
    console.log("current hour:   " + currenTime);
    // // create a form and ask for the city name
    var cityNotFound = false;
    
    var myLocalStorageCity = JSON.parse(localStorage.getItem("city"));

    //get last information


    function loadCities() {
        if (myLocalStorageCity !== null) {
            for (var i = 0; i < myLocalStorageCity.length; i++) {
                newButtonCity(myLocalStorageCity[i]);
            }
        }
    }
    loadCities();

    function newButtonCity(cityname) {
        var newBttn = $("<button>");
        newBttn.addClass("btn");
        newBttn.addClass("btn-light");
        newBttn.addClass("w-75");
        newBttn.addClass("border");
        newBttn.addClass("cityButton");
        var name = cityname.charAt(0).toUpperCase() + cityname.slice(1);
        newBttn.text(name);
        newBttn.attr("id", name)
        $("#cities").append(newBttn);
    }

    $("#clearAll").click(function (){
        myLocalStorageCity = null;
        localStorage.setItem("city", null);
        location.reload();
        return false;
    })


    $(".cityButton").click(function (event) {
        $("#row2").empty();
        var myid = $(this).attr("id");
        console.log("this is myID: " + myid);
        ajaxCalls(myid);
    })


    $("#getWeather").click(function (event) {

        event.preventDefault();
        $("#row2").empty();


        var myCity = $("#searchInfo").val();
        console.log(myCity);
        ajaxCalls(myCity);
        $("#searchInfo").val("");
        //add local storage

        if(myCity !==null){
        if (myLocalStorageCity === null) {
            myLocalStorageCity = [myCity];


        } else {
            myLocalStorageCity.push(myCity);
        }
        localStorage.setItem("city", JSON.stringify(myLocalStorageCity));

        // add to the buttons.
        newButtonCity(myCity);
        }
       
    


    })



    function ajaxCalls(city) {

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

        var city = city.charAt(0).toUpperCase() + city.slice(1);




        $("#city").text(city + " " + currenTime);


        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET",

            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 404 || errorThrown == 'Not Found') {
                    cityNotFound = true;
                    alert("City not Found")
                    console.log('There was a 404 error. Please try again.');
                }
            }

        }).
            then(function (response) {
                console.log(response);

                myTemperature = response.main.temp;
                $("#temperature").text("Temperature: " + myTemperature + " F");
                console.log(myTemperature)

                myHumidity = response.main.humidity;
                $("#humidity").text("Humidity: " + myHumidity + "%");
                console.log(myHumidity)

                myWindSpeed = response.wind.speed;
                $("#windspeed").text("Wind Speed: " + myWindSpeed + " MPH");
                console.log(myWindSpeed)

                myLat = response.coord.lat;
                console.log(myLat)

                myLon = response.coord.lon;
                console.log(myLon)

                myIcon = response.weather[0].icon;
                var imageUrl = "https://openweathermap.org/img/wn/" + myIcon + "@2x.png"
                $("#cityImage").attr("src", imageUrl);
                console.log(myIcon);


                var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + myLat + "&lon=" + myLon;


                $.ajax({
                    url: queryURLUV,
                    method: "GET"
                }).then(function (uvResponse) {
                    console.log(uvResponse)
                    myUvIndex = uvResponse.value;

                    if (myUvIndex > 7) {
                        $("#uvvalue").addClass("uvred");
                    }
                    if (myUvIndex > 2 && myUvIndex < 8) {
                        $("#uvvalue").addClass("uvyellow");
                    }
                    if (myUvIndex < 3) {
                        $("#uvvalue").addClass("uvgreen");
                    }

                    $("#uvvalue").text(myUvIndex);
                })




            });



        $.ajax({
            url: queryURLForecast,
            method: "GET"

        }).then(function (data) {

            console.log(data)
            j = 1;
            for (var i = 0; i < data.list.length; i++) {
                var mydataHour = data.list[i].dt_txt;

                // console.log(mydataHour)
                // console.log(data.list[i].dt_txt.indexOf("12:00:00"));

                if (data.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    console.log(j)
                    var datatemperature = data.list[i].main.temp;
                    console.log(datatemperature);
                    var datahumidity = data.list[i].main.humidity;
                    console.log(datahumidity)
                    var dataImage = data.list[i].weather[0].icon;
                    console.log(dataImage)
                    var dataDate = data.list[i].dt_txt;
                    console.log(dataDate)
                    var parsedDate = moment.parseZone(dataDate).format("MM/DD/YYYY");
                    j++;

                    var div1 = $("<div>")
                    div1.addClass("dayForecast");
                    div1.attr("id", i);
                    $("#row2").append(div1);

                    var div2 = $("<div>")
                    div2.addClass("card");
                    div2.addClass("text-white");
                    div2.addClass("bg-primary");
                    div1.append(div2);

                    var div3 = $("<div>")
                    div3.addClass("card-body");
                    div2.append(div3);

                    var header1 = $("<h5>");
                    header1.addClass("car-title");
                    header1.text(parsedDate);
                    div3.append(header1);



                    var imageBox = $("<img>");
                    var imageUrl = "http://openweathermap.org/img/wn/" + dataImage + ".png"

                    imageBox.attr("src", imageUrl);//do
                    div3.append(imageBox);

                    var p1 = $("<p>")
                    p1.text("Temp: " + datatemperature + " F")
                    div3.append(p1);
                    // text

                    var p2 = $("<p>")
                    p2.text("Humidity: " + datahumidity + "%")
                    div3.append(p2);
                    // text


                }

            }

        })
    }
});

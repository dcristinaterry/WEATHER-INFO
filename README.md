# H6-WEATHER-INFO

This is a weather app.

## GettingStarted

Where is the project?

>[github repository](https://github.com/crisdc88/H6-WEATHER-INFO)

## Prerequisites

>N/A

## Built With

* HTML
* CSS
* jQuery

## Deployed Link

>[deployed URL: https://crisdc88.github.io/H5-WD-SCHEDULER/](https://crisdc88.github.io/H6-WEATHER-INFO/)

## Code-Snippets

1. Open script.js
2. Find the following code showing API calls to weather API.

```
    $.ajax({
            url: queryURL,
            method: "GET",

            error : function(jqXHR, textStatus, errorThrown) { 
                if(jqXHR.status == 404 || errorThrown == 'Not Found') 
                { 
                    cityNotFound=true;
                    alert("City not Found")
                    console.log('There was a 404 error. Please try again.'); 
                }
            }

        }).
            then(function (response) {
                console.log(response);

```

## Author

D. Cristina Terry.
GitHub: [https://github.com/crisdc88/](https://github.com/crisdc88/),

LinkedIn: [www.linkedin.com/in/dcristinaterry](www.linkedin.com/in/dcristinaterry)

## License

[MIT](https://choosealicense.com/licenses/mit/)


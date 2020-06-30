# H6-WEATHER-INFO

Thank you for visitin my weather-app.  With this application you will be able to find a citie's 5 day weather cast


## Screen shots / gifs

![weatherApp](./Assets/ScreenS1.png)

## GettingStarted

GitHub Repository:

>[github repository](https://github.com/crisdc88/H6-WEATHER-INFO)

## Technologies Used

* HTML
* CSS
* Bootstrap
* jQuery
* Ajax

## Deployed Link

>[deployed URL: https://crisdc88.github.io/H5-WD-SCHEDULER/](https://dcristinaterry.github.io/WEATHER-INFO/)

## Leasons Learned / Code-Snippets

1. Open script.js
2. Find the following code showing API calls to weather API
3. In this section of the code I implemented the use of ajax to make an API call, and some error checks for the response.  Also I was able to practice asynchroncity with JavaScript since I needed to implement nested ajax calls.

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
        ...

```

## Author
<img src="https://avatars.githubusercontent.com/u/61372364?" alt="avatar" style="border-radius:20px" width="30"/>

D. Cristina Terry.
GitHub: [https://github.com/dcristinaterry](https://github.com/dcristinaterry),

LinkedIn: [www.linkedin.com/in/dcristinaterry](www.linkedin.com/in/dcristinaterry)

## License

![license](https://img.shields.io/badge/license-MIT-green)

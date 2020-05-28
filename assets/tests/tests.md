# Testing my code

## Simple Methods of testing

While coding in all of my different functions and features I regularly performed small checks to make sure it was working as intended. For example:

* Input / Search bars 
    * Once in place, I created a function in jQuery to be able to retrieve the data the user has inputed and then console.log the value to the console so I can see that I can store the information and no errors are thrown up.
    * Inputting things like numbers and special characters to check what is thrown back at me or logged to the console incase there is an issue with those characters. 
    * Being able to store a variable of the users input and call it outside of the function.

* Navbar and buttons
    * Once the buttons and navbar had actual functions and jQuery functions to make them scroll to a different section of the page I religously clicked them, (sometimes as fasted as I could) to check if anything broke or if animations were causing issues. 
    * Made sure all of the buttons went to the correct location on the page, i.e JMDb went to the top of the page, Movies went to the search bar for movies etc. 
    * Tried the buttons consecutively in order, reverse and at random. Mostly to test what the animations did when I clicked on mid animation of another button. 

* Responsiveness 
    * Using dev tools within chrome, firefox, IE, edge and opera I loaded the page using the VS code extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and rescaled the website corresponding to the different breakpoints of devices. Such as mobile small at 320px, mobile medium at 375px, mobile large at 425px and so forth. 
    * I built the website with mobile first and then scaled it upwards towards dektop sizes finishing with 4k resolution. 
    * At each breakpoint I made sure all of the buttons and search results were working and that none of the css styling was broken.
    * Because different browsers can sometimes react differently to plugins and styling I took careful time at it worked in all of them, actually manually changing my code in places to make sure it worked throughout for each of the different platforms. 
    * I repeated this process many times, after every major style change or feature was implemented into the project. 

## Before Jasmine testing

Before I tested anything using Jasmine there were a few simple steps I employed to make sure my tests would even begin to work. Similar to what I outlined above I would create a function like "getMovies" and then place a simple method inside like console.log("Hello"). This was to make sure everything was linked properly inside my html file and that I would get an outcome from the js file to the website console. While I knew I could also use Jasmine to check if this function worked I thought it was quicker and just as effective to use the method I did. 

I repeated this method every time I created a function, but also when I was using a function to call an api I would use it again to make sure that I was able to pull from the api. For example I would call the api and then assign a variable to the output and log that to the console, such as: 

$.getJSON (api call)
    .then (function(response) {
        console.log(response);
})


This would allow me to see the entire output of my api call in the console. This also helped when I was having to call from specific arrays and such as I could see where all of the relevant information was held within the JSON data. Such as before, I repeated this method every time creating a new function with the relevant structure. 

After this was completed I took some extra methods to make sure I could pull specific data from the data into my code and display it to the website. Such as assigning varaible to specific keys within the JSON data. Which would look something like this:

$.getJSON (api call)
    .then (function(response) {
        let movies = response.Search;

        console.log(movies);
    })

This method is basically creating a variable "movies" to be the data from the api call called "search" which contained all of the search results from an input. (note this is just an example very close to the original, it does not include the other elements of the code that were needed to make sure that I also had an input to test)

Or:

$.getJSON (api call)
    .then (function(response) {
        let movies = response.Search;
        let movieName = movies.Title;

        console.log(movieName);
    })

This showed me that I could succesfully navigate the JSON data and pull particular parts to the console, therefore in theory be able to display that information to my website when wanted using jQuery.

I understood while I was doing this that I could use Jasmine for all of these tests but at the time I didn't this it was neccesary to get the same results but also that these tests would become redundant after the whole function was complete. Therefore I didn't use the testing suite. 

Another form of testing I completed was keeping error codes being logged to the console if any were thrown up. I did this by adding:

.catch(function (error) {
    console.log(error);
});

To the end of functions, this then allowed me to catch errors when running the code or performing functions, therefore allowing me to test and re-develop the code to make sure no errors are thrown unsuspectingly. I could then code using defensive programming to make sure the user, if ever presented with an error knew why and how to correct what had happened. For example, entering an input into the search bars that doesn't produce a result (like gibberish or random amount of characters that isn't a movie or a person).


## Jasmine Testing


## Online / automated tests

I also ran a few online tests provided from different websites/companies. They are outlined as below:

1. [W3C Validator for HTML markup](https://validator.w3.org/)
    - My warning messages that I came across when running this test were handled and corrected.
    - There is still one markup warning when running the test due to having an empty h5 element. This is due to it being populated when a function in my JS code is ran on users request of pressing a button.

2. [Jigsaw CSS validator](https://jigsaw.w3.org/css-validator/)
    - No errors found at the end of the project.

3. [JSHint Javascript validator](https://jshint.com/)
    - This threw me a little when being used. No code breaking errors were thrown, only small errors specific to JSHint it seems, such as: 	'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz). 
    - JSHint also flags every jQuery $ up as undefined. Which isn't the case.

4. [Code Beautify](https://codebeautify.org/jsvalidate)
    - This JS code validator threw only one error which was an undefined const on line 3 of search.js. This variable is used to store information later used in my code therefore needed to be there. No other errors.
/* Top rated section */

const trendingApi = {
    /* a constant variable that contains the values needed to call on the external api*/
    key:
        "dbf7a083d0697d1c9a00cdd04a37af37" /* key needed to access the api, without one you cannot call on the api */,
    base:
        "https://api.themoviedb.org/3/trending/" /* https request for the api */,
    detailsBase: "https://api.themoviedb.org/3/",
};

$(document).ready(function () {
    /* when page is loaded */
    $("#trending-movies").slick({
        /* Slick is an external plugin that allows me to create a carousel or slider without much js */
        mobileFirst: true, // mobileFirst works the same way that @media does now, before it was reversed and confusing to understand when looking at the code
        autoplay: true, // autoplay through the slides or not
        dots: false, // seen on a lot of carousels, dots at the bottom, not needed here
        arrows: false, // arrows false until laptop resolution width
        slidesToShow: 1, // how many slides are shown at once
        slidesToScroll: 1, // how many slides are scrolled at once, either by autoplay or manually by user
        centerMode: true, // focuses the current slide in the center of the screen
        infinite: true, // does the carousel loop infinitely or not
        adaptiveHeight: true, // will change the height of the container to match title length, on mobile with 1 slide showing the height will move back and forth
        focusOnSelect: true, // clicking on specific slide will center it on the screen
        swipeToSlide: true, // allows for swiping on mobile or desktop to go past the defined slidesToScroll limit
        responsive: [
            // responsive breakpoints, work the same as css media queries
            {
                breakpoint: 425, // min height this will change, set to L mobile device
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    autoplay: false,
                    arrows: true,
                    slidesToShow: 3,
                    prevArrow: $("#show-prev"),
                    nextArrow: $("#show-next"),
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    autoplay: false,
                    arrows: true,
                    slidesToShow: 5,
                    prevArrow: $("#movie-prev"), // arrows are defined as true and then located using this selector for custom styling in html and css
                    nextArrow: $("#movie-next"),
                },
            },
        ],
    });

    $.getJSON(`${trendingApi.base}movie/week?api_key=${trendingApi.key}`).then(
        /* .getJSON method to call on the api and return data in JSON format */
        function (movieResponse) {
            console.log(movieResponse);
            let trendingMovie =
                movieResponse.results; /* These processes are very similar to the ones on search.js - create var to hold array data */
            let movieOutput = "";

            $.each(trendingMovie, function (index, movie) {
                /* for each item inside of an array within the api perform below action */

                movieOutput += `
                    <div class="item">
                        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" /> 
                        <h4 class="white">${movie.title}</h4>
                        <a onclick="tmdbSelectedMovie('${movie.id}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Movie Details</a>
                    </div>
                `;
            });

            $("#trending-movies").slick("slickAdd", movieOutput); // add's the movieOutput html to the slick.js container creating a new carousel
        }
    );

    /* Originally wanted a button to remove html and add new for the user to switch 
    inbetween, no functionality to do that in the plugin so not a viable option */
    $("#trending-tv-shows").slick({
        /* each carousel created by slick has to be coded seperately no functionality to create multiple at the same time and asign different data to them */
        mobileFirst: true /* each carousel is exactly the same */,
        autoplay: true,
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        infinite: true,
        adaptiveHeight: true,
        focusOnSelect: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    autoplay: false,
                    arrows: true,
                    slidesToShow: 3,
                    prevArrow: $("#show-prev"),
                    nextArrow: $("#show-next"),
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    autoplay: false,
                    arrows: true,
                    slidesToShow: 5,
                    prevArrow: $("#show-prev"),
                    nextArrow: $("#show-next"),
                },
            },
        ],
    });

    $.getJSON(`${trendingApi.base}tv/week?api_key=${trendingApi.key}`).then(
        function (showResponse) {
            console.log(showResponse);
            let trendingShow = showResponse.results;
            let showOutput = "";

            $.each(trendingShow, function (index, show) {
                showOutput += `
                    <div class="item">
                        <img src="https://image.tmdb.org/t/p/original${show.poster_path}" />
                        <h4 class="white">${show.name}</h4>
                        <a onclick="tmdbSelectedShow('${show.id}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Movie Details</a>
                    </div>
                `;
            });

            $("#trending-tv-shows").slick("slickAdd", showOutput);
        }
    );

    $("#trending-people").slick({
        mobileFirst: true,
        autoplay: true,
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        infinite: true,
        adaptiveHeight: true,
        focusOnSelect: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    autoplay: false,
                    arrows: true,
                    slidesToShow: 3,
                    prevArrow: $("#show-prev"),
                    nextArrow: $("#show-next"),
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    autoplay: false,
                    arrows: true,
                    slidesToShow: 5,
                    prevArrow: $("#people-prev"),
                    nextArrow: $("#people-next"),
                },
            },
        ],
    });

    $.getJSON(`${trendingApi.base}person/week?api_key=${trendingApi.key}`).then(
        function (personResponse) {
            console.log(personResponse);
            let trendingPerson = personResponse.results;
            let personOutput = "";

            $.each(trendingPerson, function (index, person) {
                personOutput += `
                    <div class="item">
                        <img src="https://image.tmdb.org/t/p/original${person.profile_path}" />
                        <h4 class="white">${person.name}</h4>
                        <a onclick="selectedPerson('${person.id}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Details</a>
                    </div>
                `;
            });

            $("#trending-people").slick("slickAdd", personOutput);
        }
    );
});

/* Gets the tmbd id from JSON data then calls on the api again to get the Imdb Id which can then be
re-routed to the main function on the search.js page to get all the details of the movie and 
display them in the modal */
function tmdbSelectedMovie(id) {
    $.getJSON(
        `${trendingApi.detailsBase}movie/${id}?api_key=${trendingApi.key}&language=en-US` // accesses api data
    ).then(function (detailsResponse) {
        let movieImdb = detailsResponse.imdb_id; // stores particilar data needed within a variable
        selectedMovie(movieImdb); // performs next function, selectedMovie() on search.js page
    });
}

/* Similar to the above function, but once the tmbd id is gathered from the JSON data it then
performs another call to get the external ids such as the Imdb one to then re-route back 
to the main function on search.js and applied to the modal */
function tmdbSelectedShow(id) {
    $.getJSON(
        `${trendingApi.detailsBase}tv/${id}/external_ids?api_key=${trendingApi.key}&language=en-US` // the api needs two functions to retrieve imdb id for tv shows and movies as they are seperate calls
    ).then(function (detailsResponse) {
        let showImdb = detailsResponse.imdb_id;
        selectedMovie(showImdb);
    });
}

// $(document).ready(getTopRatedMovies());

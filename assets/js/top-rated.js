/* Top rated section */

const trendingApi = {
    key: "dbf7a083d0697d1c9a00cdd04a37af37",
    base: "https://api.themoviedb.org/3/trending/",
    detailsBase: "https://api.themoviedb.org/3/",
};

$(document).ready(function () {
    /* when page is loaded */
    $("#trending-movies").slick({
        infinite: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 770,
                settings: {
                    infinite: true,
                    dots: false,
                    arrows: false,
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "3em",
                    slidesToShow: 1,
                },
            },
        ],
    });

    $.getJSON(`${trendingApi.base}movie/week?api_key=${trendingApi.key}`).then(
        function (movieResponse) {
            console.log(movieResponse);
            let trendingMovie = movieResponse.results;
            let movieOutput = "";

            $.each(trendingMovie, function (index, movie) {
                movieOutput += `
                    <div class="item">
                        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" />
                        <h4 class="white">${movie.title}</h4>
                        <a onclick="tmdbSelectedMovie('${movie.id}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Movie Details</a>
                    </div>
                `;
            });

            $("#trending-movies").slick("slickAdd", movieOutput);
        }
    );

    $("#trending-tv-shows").slick({
        infinite: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 770,
                settings: {
                    arrows: false,
                    infinite: true,
                    dots: false,
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "3em",
                    slidesToShow: 1,
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
        infinite: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 770,
                settings: {
                    arrows: false,
                    infinite: true,
                    dots: false,
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "3em",
                    slidesToShow: 1,
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
        `${trendingApi.detailsBase}movie/${id}?api_key=${trendingApi.key}&language=en-US`
    ).then(function (detailsResponse) {
        let movieImdb = detailsResponse.imdb_id;
        selectedMovie(movieImdb);
    });
}

/* Similar to the above function, but once the tmbd id is gathered from the JSON data it then
performs another call to get the external ids such as the Imdb one to then re-route back 
to the main function on search.js and applied to the modal */
function tmdbSelectedShow(id) {
    $.getJSON(
        `${trendingApi.detailsBase}tv/${id}/external_ids?api_key=${trendingApi.key}&language=en-US`
    ).then(function (detailsResponse) {
        let showImdb = detailsResponse.imdb_id;
        selectedMovie(showImdb);
    });
}

// $(document).ready(getTopRatedMovies());

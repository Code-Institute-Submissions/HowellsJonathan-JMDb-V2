/* Top rated section */

const trendingApi = {
    key: "dbf7a083d0697d1c9a00cdd04a37af37",
    base: "https://api.themoviedb.org/3/trending/",
    detailsBase: "https://api.themoviedb.org/3/movie/",
};

$(document).ready(function () {
    /* when page is loaded */
    $("#trending-movies").slick({
        centerMode: true,
        centerPadding: "5em",
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "3em",
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
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
        centerMode: true,
        centerPadding: "5em",
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "3em",
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
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
                        <a onclick="tmdbSelectedMovie('${show.id}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Movie Details</a>
                    </div>
                `;
            });

            $("#trending-tv-shows").slick("slickAdd", showOutput);
        }
    );

    $("#trending-people").slick({
        centerMode: true,
        centerPadding: "5em",
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "3em",
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
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

function tmdbSelectedMovie(id) {
    $.getJSON(
        `${trendingApi.detailsBase}${id}?api_key=${trendingApi.key}&language=en-US`
    ).then(function (detailsResponse) {
        let nowImdbId = detailsResponse.imdb_id;
        selectedMovie(nowImdbId);
    });
}

// $(document).ready(getTopRatedMovies());

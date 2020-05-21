/* Movie Searching Method */

const movieApi = {
    key: "7506dcc9",
    base: "http://www.omdbapi.com/",
};

$(document).ready(function () {
    $("#movieSearchForm").on("submit", function (event) {
        let query = $("#movieSearchText").val();
        getMovies(query);
        event.preventDefault();
    });
});

function getMovies(query) {
    $.getJSON(`${movieApi.base}?s=${query}&apikey=${movieApi.key}`)
        .then(function (response) {
            let movies = response.Search;
            let output = "";
            $.each(movies, function (index, movie) {
                output += `
                    <div class="col-md-4 col-lg-3">
                        <div class="search-card text-center">
                            <img src="${movie.Poster}"/>     
                            <h4 class="white" >${movie.Title}</h4>
                            <a onclick="selectedMovie('${movie.imdbID}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Movie Details</a>
                        </div>
                    </div>
                `;
            });

            $("#movies").html(output);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function selectedMovie(id) {
    $.when(sessionStorage.setItem("movieId", id)).then(getMovie);
}

function getMovie() {
    let movieId = sessionStorage.getItem("movieId");

    $.getJSON(`${movieApi.base}?i=${movieId}&apikey=${movieApi.key}`)
        .then(function (response) {
            let movie = response;

            $("#ModalTitle").html(movie.Title);

            $(".modal-body").html(`
                <ul class="list-group">
                    <li class="list-group-item">
                        <strong>Genre:</strong> ${movie.Genre}
                    </li>
                    <li class="list-group-item">
                        <strong>Released:</strong> ${movie.Released}
                    </li>
                    <li class="list-group-item">
                        <strong>Rated:</strong> ${movie.Rated}
                    </li>
                    <li class="list-group-item">
                        <strong>Runtime:</strong> ${movie.Runtime}
                    </li>
                    <li class="list-group-item">
                        <strong>Actors:</strong> ${movie.Actors}
                    </li>
                    <li class="list-group-item">
                        <strong>Director:</strong> ${movie.Director}
                    </li>
                    <li class="list-group-item">
                        <strong>Writer:</strong> ${movie.Writer}
                    </li>
                    <li class="list-group-item">
                        <strong>Plot:</strong> ${movie.Plot}
                    </li>
                    <li class="list-group-item">
                        <strong>IMDb Rating:</strong> ${movie.imdbRating}
                    </li>
                    <li class="list-group-item">
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank">View on IMDb</a>
                    </li>
                </ul>
                `);
        })
        .catch(function (error) {
            console.log(error);
        });
}

/* People Searching Method */

const personApi = {
    key: "dbf7a083d0697d1c9a00cdd04a37af37",
    base: "https://api.themoviedb.org/3/search/",
    personBase: "https://api.themoviedb.org/3/person/",
};

$(document).ready(function () {
    $("#personSearchForm").on("submit", function (event) {
        let query = $("#personSearchText").val();
        getPeople(query);
        event.preventDefault();
    });
});

function getPeople(query) {
    $.getJSON(
        `${personApi.base}person?api_key=${personApi.key}&language=en-US&query=${query}&page=1&include_adult=false`
    )
        .then(function (response) {
            let people = response.results;
            let output = "";
            $.each(people, function (index, person) {
                output += `
                    <div class="col-md-4 col-lg-3">
                        <div class="search-card text-center">
                            <img src="https://image.tmdb.org/t/p/original${person.profile_path}"/>     
                            <h4 class="white" >${person.name}</h4>
                            <a onclick="selectedPerson('${person.id}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Details</a>
                        </div>
                    </div>
                `;
            });

            $("#people").html(output);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function selectedPerson(id) {
    $.when(sessionStorage.setItem("personId", id)).then(getPerson);
}

function getPerson() {
    let personId = sessionStorage.getItem("personId");

    $.getJSON(
        `${personApi.personBase}${personId}?api_key=${personApi.key}&language=en-US`
    )
        .then(function (response) {
            let person = response;

            $("#ModalTitle").html(person.name);

            $(".modal-body").html(`
                <ul class="list-group">
                    <li class="list-group-item">
                        <strong>Birthday:</strong> ${person.birthday}
                    </li>
                    <li class="list-group-item">
                        <strong>Known For:</strong> ${person.known_for_department}
                    </li>
                    <li class="list-group-item">
                        <strong>From:</strong> ${person.place_of_birth}
                    </li>
                    <li class="list-group-item">
                        <strong>Biography:</strong> ${person.biography}
                    </li>
                    <li class="list-group-item">
                        <a href="https://www.imdb.com/name/${person.imdb_id}" target="_blank">View on IMDb</a>
                    </li>
                </ul>
                `);
        })
        .catch(function (error) {
            console.log(error);
        });
}

/* Buttons */

jQuery(document).ready(function () {
    var toTop = $(".to-top-btn");

    toTop.on("click", function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });

    var bufferBtn = $("#to-buffer-btn");

    bufferBtn.on("click", function (event) {
        event.preventDefault();
        $("html, body").animate(
            {
                scrollTop: $("#buffer-page").offset().top,
            },
            1000
        );
    });

    var movieBtn = $("#to-movie-btn");

    movieBtn.on("click", function (event) {
        event.preventDefault();
        $("html, body").animate(
            {
                scrollTop: $("#movie-search").offset().top,
            },
            1000
        );
    });
});

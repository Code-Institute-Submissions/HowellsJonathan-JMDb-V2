const movieApi = {
    key: "7506dcc9",
    base: "http://www.omdbapi.com/",
};

$(document).ready(function () {
    $("#searchForm").on("submit", function (event) {
        let query = $("#searchText").val();
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
                        <div class="movie-card text-center">
                            <img src="${movie.Poster}"/>     
                            <h4 class="white" >${movie.Title}</h4>
                            <a onclick="selectedMovie('${movie.imdbID}')" class="movie-details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#movieModal">Movie Details</a>
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

            $("#movieModalTitle").html(movie.Title);

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

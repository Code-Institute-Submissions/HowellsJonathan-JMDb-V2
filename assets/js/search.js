/* Movie Searching Method */

const movieApi = {
    /* base variable to store key and http reference for api */
    key: "7506dcc9",
    base: "https://www.omdbapi.com/",
};

$(document).ready(function () {
    /* when page is loaded */
    $("#movieSearchForm").on("submit", function (event) {
        /* similar to addEventListener("keypress", function()) */
        let query = $("#movieSearchText").val();
        getMovies(query);
        event.preventDefault();
    });
});

/* pulls up total list of movies with the input from the user */
function getMovies(query) {
    $.getJSON(
        `${movieApi.base}?s=${query}&apikey=${movieApi.key}`
    ) /* .getJSON method retrieves data from an external api */
        .then(function (response) {
            if (response.Response === "True") {
                let movies =
                    response.Search; /* the api is stored in arrays, here a new var is created to select the particular array needed */
                let output = "";
                /* for each of the responses in JSON output html to the webpage */
                $.each(movies, function (index, movie) {
                    output += `
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="search-card text-center">
                            <img src="${movie.Poster}"/>     
                            <h4 class="white" >${movie.Title}</h4>
                            <a onclick="selectedMovie('${movie.imdbID}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Movie Details</a>
                        </div>
                    </div>
                `;
                });

                /* outputs the html to the div with #movies-to-collapse */
                $("#movies-to-collapse").html(output);

                $(".collapse-button-m").show();
            } else {
                alert("Movie not found! Please enter a valid movie title or word.")
            }

        })
}

function collapseMovies() {
    /* Function to be called when collapse button is clicked */
    $("#movies-to-collapse").toggle();
    $(".collapse-button-m").toggleClass("flip");
}

/* When "get details" button is clicked on a movie this stores the id of the movie 
  to be used in another function to get more information on the movie */
function selectedMovie(id) {
    $.when(sessionStorage.setItem("movieId", id)).then(getMovie);
}

function getMovie() {
    /* retrieves the stores id */
    let movieId = sessionStorage.getItem("movieId");

    /* uses the stored id to get more details about the selected movie */
    $.getJSON(`${movieApi.base}?i=${movieId}&apikey=${movieApi.key}`)
        .then(function (response) {
            let movie = response;

            /* changes the modals details to data from the JSON api call */
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
}

/* People Searching Method 
   see above comments for below code */

const personApi = {
    key: "dbf7a083d0697d1c9a00cdd04a37af37",
    base: "https://api.themoviedb.org/3/search/",
    personBase: "https://api.themoviedb.org/3/person/",
};

// $(document).ready(function () {
//     $("#personSearchForm").on("submit", function (event) {
//         let query = $("#personSearchText").val();
//         getPeople(query);
//         event.preventDefault();
//     });
// });

$("#personSearchForm").submit(function () {
    let emptyCheck = $("#personSearchText").val();
    if (emptyCheck == "") {
        alert("Please enter a valid input")
    } else if (emptyCheck !== "") {
        let query = emptyCheck;
        getPeople(query);
    }
})


// function searchPeople() {
//     $("#personSearchForm").on("submit", function (event) {
//         let query = $("#personSearchText").val();
//         getPeople(query);
//         event.preventDefault();
//     });
// }

// else {
//     output += `
//         <div class="col-md-4 col-lg-3">
//             <div class="search-card text-center">
//                 <img src="https://image.tmdb.org/t/p/original${person.profile_path}"/>     
//                 <h4 class="white" >${person.name}</h4>
//                 <a onclick="selectedPerson('${person.id}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Details</a>
//             </div>
//         </div>
//     `;
// }

function getPeople(query) {
    $.getJSON(
        `${personApi.base}person?api_key=${personApi.key}&language=en-US&query=${query}&page=1&include_adult=false`
    )
        .then(function (response) {
            if (response.page === 1) {
                let people = response.results;
                let output = "";
                $.each(people, function (index, person) {
                    if (person.profile_path != null) { /* This if statement will prevent 404 errors due to the API pulling null JSON data for the image of each entity */
                        output += `
                            <div class="col-md-4 col-lg-3">
                                <div class="search-card text-center">    
                                    <img src="https://image.tmdb.org/t/p/original${person.profile_path}"/>  
                                    <h4 class="white" >${person.name}</h4>
                                    <a onclick="selectedPerson('${person.id}')" class="details-button hvr-shutter-out-horizontal red" href="#" data-toggle="modal" data-target="#modal">Details</a>
                                </div>
                            </div>
                        `;
                    } else {
                        return
                    }
                }
                );

                $("#people-to-collapse").html(output);

                $(".collapse-button-p").show();
            }
        })
}

function collapsePeople() {
    $("#people-to-collapse").slideToggle("slow", function () { }); // Slide toggle animation not working as intended. Too sharp
    $(".collapse-button-p").toggleClass("flip");
}

/* Get extra details about actor or actress based off of stored id from the search JSON data */

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
}

/* Buttons */

jQuery(document).ready(function () {
    var toTop = $(
        ".to-top-btn"
    ); /* A button that scrolls back to the top of the page */

    toTop.on("click", function (event) {
        event.preventDefault();
        $("html, body").animate(
            { scrollTop: 0 },
            1000
        ); /* Animate the scroll function to make it smooth and not a sharp jump */
    });

    var peopleBtn = $(
        "#to-people-btn"
    ); /* a button that will scroll to a particular section on the website */

    peopleBtn.on("click", function (event) {
        event.preventDefault();
        $("html, body").animate(
            {
                scrollTop: $("#people-btn").offset().top,
            },
            1000
        );
    });

    var movieBtn = $(
        "#to-movie-btn"
    ); /* a button that will scroll to a particular section on the website */

    movieBtn.on("click", function (event) {
        event.preventDefault();
        $("html, body").animate(
            {
                scrollTop: $("#movie-btn").offset().top,
            },
            1000
        );
    });

    var trendingBtn = $(
        "#to-trending-btn"
    ); /* a button that will scroll to a particular section on the website */

    trendingBtn.on("click", function (event) {
        event.preventDefault();
        $("html, body").animate(
            {
                scrollTop: $("#trending-btn").offset().top,
            },
            1000
        );
    });
});

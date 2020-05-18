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
    axios
        .get(`${movieApi.base}?s=${query}&apikey=${movieApi.key}`)
        .then(function (response) {
            console.log(response);
            let movies = response.data.Search;
            let output = "";
            $.each(movies, function (index, movie) {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}"/>     
                            <h4>${movie.Title}</h4>
                            <a onclick="selectedMovie("${movie.imdbID}")" class="btn btn-primary" href="#">Movie Details</a>
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

// function getMovies(query) {
//     $.getJSON(`http://www.omdbapi.com/?s=${query}&apikey=7506dcc9`)
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

describe("My Jasmine setup", function () {

    let a = true;

    it("Tests if the value of a is true", function () {
        expect(a).toBe(true);
    })
});

describe("Spy on my JSON call", function () {

    xit("Should make a JSON request with success", function () {

        spyOn($, "getJSON");

        expect($.getJSON).toHaveBeenCalled();
    })
})

describe("getMovies functions produces output successfully", function () {

    beforeEach(function () {
        query = "home";
        newMovie = new getMovies(query);
    })

    it("Results should match getMovies output", function () {

    })
})
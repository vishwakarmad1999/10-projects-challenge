const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=3";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moviesContainer = document.querySelector(".movies")
const searchForm = document.querySelector("form")
const searchInput = document.querySelector(".search")

searchForm.addEventListener("submit", e => {
    e.preventDefault()
    const searchTerm = searchInput.value

    if (searchTerm) {
        searchInput.value = ""
        getMovies(SEARCHAPI + searchTerm)
    }
})

function getMovies(url) {
    fetch(url).
    then(res => res.json()).
    then(res => {
        const movies = res.results
        addMovies(movies)
    })
}

function addMovies(movies) {
    moviesContainer.innerHTML = ""

    movies = movies.filter(movie => movie.poster_path != null)

    movies.forEach(movie => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        let ratingClass = ""
        if (movie.vote_average >= 8) {
            ratingClass = "green"
        } else if (movie.vote_average < 8 && movie.vote_average >= 6) {
            ratingClass = "orange"
        } else {
            ratingClass = "red"
        }

        movieEl.innerHTML = `
            <img src="${IMGPATH + movie.poster_path}" alt="${movie.original_title}" />
            <div class="movie-info">
                <h5>${movie.original_title}</h5>
                <h5 class="rating ${ratingClass}">${movie.vote_average}</h5>
            </div>
            <div class="overview">
                <h4>Overview:</h4>
                ${movie.overview}
            </div>
        `

        moviesContainer.append(movieEl)
    })   
}

getMovies(APIURL)
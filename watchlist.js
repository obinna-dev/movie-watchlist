let ratingIcon
let userInput
const apiKey = "b908409b"
const goodRating = `<p class="fa fa-star star-checked"></p>`
const badRating = `<p class="fa fa-star star-bad-rating"></p>`
let watchListContainerHtml = document.getElementById("watchlist-container")
const searchForm = document.getElementById("search-form")

let retrievedWatchListArr = JSON.parse(localStorage.getItem("myWatchList"))
retrievedWatchListArr.map(function(movieIDs){
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieIDs}`)
        .then(res => res.json())
        .then(data => {
            renderSavedMovieList(data)
        })
})

function renderSavedMovieList(movie) {
    movie.imdbRating <= 5 ? ratingIcon = badRating
    : ratingIcon = goodRating

    watchListContainerHtml.innerHTML += `
        <div class="result ${movie.imdbID}" id="result">
            <div class="movie-poster-container"><img src="${movie.Poster}" alt="${movie.Title} movie poster" class="movie-poster"></div>
            <div class="movie-info-container">
            <div class="title-and-rating-container">
                <h3 class="movie-title">${movie.Title}</h3>               
                ${ratingIcon}
                <h5 class="rating">${movie.imdbRating}</h5>
            </div>
            <div class="movie-meta-data"> 
                <h5>${movie.Runtime}</h5>
                <h5>${movie.Genre}</h5>
                <div class="watchlist-btn-container">
                    <h5 class="watchlist-btn" onclick="removeFromWatchList('${movie.imdbID}')" id="${movie.imdbID}"><span class="fa fa-minus-circle" aria-hidden="add ${movie.Title} to watch-list"></span> Remove</h5>
                </div>
            </div>
            <p class="movie-summary">${movie.Plot}</p>
            <h5 class="actors">Actors: <em>${movie.Actors}</em></h5>
            <h5 class="director">Director: <em>${movie.Director}</em></h5>
            </div>
        </div>
    `
}

function removeFromWatchList(savedMovieId)   {
    retrievedWatchListArr.splice( retrievedWatchListArr.indexOf(savedMovieId), 1 )
    window.localStorage.setItem("myWatchList", JSON.stringify(retrievedWatchListArr))
    document.querySelector(`.${savedMovieId}`).remove()
}
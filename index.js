let ratingIcon
let userInput
const goodRating = `<p class="fa fa-star star-checked"></p>`
const badRating = `<p class="fa fa-star star-bad-rating"></p>`
const resultsContainerHtml = document.getElementById("results-container")
const searchForm = document.getElementById("search-form")

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    resultsContainerHtml.innerHTML = ""
    userInput = document.getElementById("search-input").value
    fetch(`http://www.omdbapi.com/?apikey=b908409b&s=${userInput}`)
    .then(res => res.json())
    .then(data => {
        data.Search.map(function(resultArrEl){
            fetch(`http://www.omdbapi.com/?apikey=b908409b&t=${resultArrEl.Title}`)
                .then(res => res.json())
                .then(data => renderSearchResults(data))
        })
    })
})

function renderSearchResults(movie)  {
    // Determine which rating icon to render- red or orange
    movie.imdbRating <= 5 ? ratingIcon = badRating
    : ratingIcon = goodRating

    // Render search results 
    resultsContainerHtml.innerHTML += `
        <div class="result" id="result">
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
                    <h5 class="watchlist-btn" onclick="addToWatchList('${movie.imdbID}')"><span class="fa fa-plus-circle" aria-hidden="add ${movie.Title} to watch-list"></span> Watchlist</h5>
                </div>
            </div>
            <p class="movie-summary">${movie.Plot}</p>
            <h5 class="actors">Actors: <em>${movie.Actors}</em></h5>
            <h5 class="director">Director: <em>${movie.Director}</em></h5>
            </div>
        </div>
    `
}

let myWatchListArr = []

function addToWatchList(movieId) {
    if (localStorage.getItem("myWatchList")){
        myWatchListArr = JSON.parse(localStorage.getItem("myWatchList"))
            if (!myWatchListArr.includes(movieId)) {
                myWatchListArr.push(movieId)
                window.localStorage.setItem("myWatchList", JSON.stringify(myWatchListArr))
                console.log(`Your movie ${movieId} has been saved!`)
            } else {console.log(`Opps! Movie ${movieId} is already saved in your watchlist!`)}
    } else {
        myWatchListArr.push(movieId)
        window.localStorage.setItem("myWatchList", JSON.stringify(myWatchListArr))
        console.log(`New watchlist created and movie ${movieId} saved in it! Congrats!`)
    }
}

// let movieToSave = {
//     "Title": ``,
//     "RatingIcon": ``,
//     "Rating": ``,
//     "Runtime": ``,
//     "Genre": ``,
//     "Plot": ``,
//     "Actors": ``,
//     "Director": ``,
//     "Poster": ``
// }

// let myWatchListArr = [{"Title": "Harry Potter and the Deathly Hallows: Part 2",
//                         "Rating": "2011",
//                         "RatingIcon": "tt1201607",
//                         "Runtime": "movie",
//                         "Genre": "movie",
//                         "Plot": "movie",
//                         "Actors": "movie",
//                         "Director": "movie",
//                         "Poster": "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
//                         }]

// myWatchListArr =    {"Title": `${movie.Title}`,
// "RatingIcon": `${ratingIcon}`,
// "Rating": `${movie.imdbRating}`,
// "Runtime": `${movie.Runtime}`,
// "Genre": `${movie.Genre}`,
// "Plot": `${movie.Plot}`,
// "Actors": `${movie.Actors}`,
// "Director": `${movie.Director}`,
// "Poster": `${movie.Poster}`
// }
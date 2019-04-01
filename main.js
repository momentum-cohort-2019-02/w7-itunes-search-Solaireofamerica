//
//
//
//
function sQuery(selector) {
    return document.querySelector(selector)
}

function sQueryAll(selector) {
    return document.querySelectorAll(selector)
}

let searchInput = document.querySelector('.search-field');
let searchText = encodeURIComponent(searchInput)
let searchForm = document.querySelector('.search-form');
let showResults = document.querySelector('.show-results');
let button = document.querySelector('.search');
let audio = document.querySelector('audio');
let apiUrl = 'https://itunes-api-proxy.glitch.me/search?term=';
let results = []

console.log(audio)


function getResults(searchText) {
    let url = (apiUrl.concat(encodeURIComponent(searchInput.value)))
    promise = fetch(url).then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    })
    return promise

}

// function resultsAray() {
//     results = []
//     getResults(searchInput)
//         .then(function (itunesData) {
//             for (let song in itunesData)
//         })
// }


function updateResults(searchInput) {
    getResults(searchInput)
        .then(function (itunesData) {
            console.log(itunesData)
            for (let i = 0; i < itunesData.results.length; i++) {
                let artist = itunesData.results[i].artistName
                let cover = itunesData.results[i].artworkUrl100
                let albumName = itunesData.results[i].collectionName
                let preview = itunesData.results[i].previewUrl
                let trackName = itunesData.results[i].trackName

                let display = `
                        <div class="song">
                        <img src="${cover}" value="${preview}" alt=""/>
                        <h3> ${artist} </h3>
                        <h3> ${albumName} </h3>
                        <h2> ${trackName}  </h2>
                        <source value="" src=" ${preview}" type="audio/mpeg" />
                        </div>
                        `
                showResults.insertAdjacentHTML('beforeend', display)
            }
        })
}
//

// document.addEventListener('click', function (event) {
//     const {
//         target
//     } = event;
//     if (target)
// })

document.addEventListener('DOMContentLoaded', function () {
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("searchInput", searchInput);
        showResults.textContent = ""
        updateResults(event.target.value)
        // sQuery('#search-text').addEventListener('change', function (event) {
        // })

    })
})




showResults.addEventListener('click', function (click) {
    let cover = document.querySelectorAll('img')
    if (click.target && click.target.nodeName === "IMG")
        audio.src = click.target.getAttribute('value')
    console.log('audio', audio.src)
})
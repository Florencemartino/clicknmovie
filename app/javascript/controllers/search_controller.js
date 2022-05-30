import { Controller } from "@hotwired/stimulus"
import { csrfToken } from "@rails/ujs"

export default class extends Controller {
  static targets = [ "title" ]

  movie(event) {
    const results = document.querySelector("#results")

    results.innerHTML = ""

    fetch(`https://imdb-api.com/en/API/SearchMovie/${event.params.key}/${this.title}`)
      .then(response => response.json())
      .then((movieResults) => {
      movieResults.results.forEach((movieResult) => {

        const imdbMovieTitle = movieResult.title
        const movieTag = `
        <li class="list-inline-item" id="imageMovie">
            <img src="${movieResult.image}" alt="" width="100%" height="100%">
              <div id='movieInfo' data-imdb-id="${movieResult.id}">${imdbMovieTitle}</div>
        </li>`
        results.insertAdjacentHTML("beforeend", movieTag)
      })

      const selectedMovie = document.getElementById("imageMovie");
      const selectedMovieImdbId = document.querySelector('#movieInfo').dataset.imdbId

      console.log('Le film choisi est',selectedMovie,  selectedMovieImdbId)

      selectedMovie.addEventListener("click", (event) => {
        console.log('event.currentTarget', event.currentTarget)
        const a = event;
        console.log('event.currentTarget', event.currentTarget.innerText, event.currentTarget.dataset['imdbId'])
        const data =
          {
            title: event.currentTarget.title,
            imdb_id: event.currentTarget.imdbid
          }

        fetch('/movies', {
          method: 'POST',
          headers:
            {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "X-CSRF-Token": csrfToken()
            },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
          console.log(`redirecting to wishlist of user ${data.inserted_item}`)
          // window.location.replace(`/user/${data.inserted_item}/wishlist/show`);
        })
      });
    })
  }


  get title() {
    return this.titleTarget.value
  }
}

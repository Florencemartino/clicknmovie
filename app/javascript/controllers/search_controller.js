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

        const movieTag = `
        <li class="list-inline-item" id="movieList" data-movie-id="${movieResult.id}"  data-movie-title="${movieResult.title}" >
            <img src="${movieResult.image}" alt="" width="100%" height="100%">
            <div>${movieResult.title}</div>
        </li>`
        results.insertAdjacentHTML("beforeend", movieTag)
      })


      const selectedMovie = document.getElementById("movieList");

      selectedMovie.addEventListener("click", (event) => {

        const data =
          {
            title: event.currentTarget.dataset.movieTitle,
            imdb_id: event.currentTarget.dataset.movieId
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
          window.location.replace(`/user/${data.inserted_item}/wishlist/show`);
        })
      });
    })
  }

  get title() {
    return this.titleTarget.value
  }
}

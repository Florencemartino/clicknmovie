import { Controller } from "@hotwired/stimulus"
import { csrfToken } from "@rails/ujs"

export default class extends Controller {
  static targets = [ "title" ]

  movie(event) {
    const results = document.querySelector("#results")

    results.innerHTML = ""

    fetch(`https://imdb-api.com/en/API/SearchTitle/${event.params.key}/${this.title}`)
    .then(response => response.json())
    .then((movieResults) => {
      movieResults.results.forEach((movieResult) => {

        const movieTitle = movieResult.title
        const movieTag = `
        <li class="list-inline-item">
            <img id='imageMovie' src="${movieResult.image}" alt="" width="100%" height="100%" title="${movieTitle}"
              <p>${movieTitle}</p>
        </li>`
        results.insertAdjacentHTML("beforeend", movieTag)


      })

      let movieTitle;
      const selectedMovie = document.getElementById("imageMovie");

      selectedMovie.addEventListener("click", (event) => {
        console.log( event.currentTarget.title)
        movieTitle = event.currentTarget.title
        const data = { title: movieTitle }

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
          console.log(`redirecting to wishlist of user ${data}`)
          // window.location.replace('/user/4/wishlist/show');
        })
      });

    })


  }


  get title() {
    return this.titleTarget.value
  }
}

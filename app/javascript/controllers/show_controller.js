import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['show']
  static values = { url: String }


  connect() {
    const movieCards = document.querySelectorAll("#movie_show");

    movieCards.forEach((movieCard) => {

      fetch(`https://imdb-api.com/en/API/SearchTitle/${this.urlValue}`)
        .then(response => response.json())
        .then((movie) => {

          const movieTag = `
          <li class="list-inline-item" id="movieList">
              <img src="${movie.image}" alt="" width="100%" height="100%">
              <div>${movie.title}</div>
          </li>`

          movieCard.insertAdjacentHTML("beforeend", movieTag)

      })
    });

  }


}

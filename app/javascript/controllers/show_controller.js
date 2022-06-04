import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['foo', 'show']
  static values = { params: String }

  connect() {
    console.log('Connected')
    const imdbApiKey = this.getImdbApiKey()
    const moviesId = document.querySelectorAll("#movie_show");

    moviesId.forEach((movieId) => {
      console.log(movieId.innerText);
    });

    movieTitles.forEach((movieTitle) => {
      fetch(`https://imdb-api.com/en/API/SearchTitle/${imdbApiKey}/${moviesId}`)
    })

  }

  getImdbApiKey() {
    return this.paramsValue
  }

}

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "title" ]

  movie() {
    console.log(`You search for: ${this.title}`)

    const results = document.querySelector("#results")

    results.innerHTML = ""

    fetch(`https://imdb-api.com/en/API/SearchTitle/k_rvvt7xsh/${this.title}`)
      .then(response => response.json())
      .then((movieResults) => {
        movieResults.results.forEach((movieResult) => {
          const movieTag = `<li class="list-inline-item"><img src="${movieResult.image}" alt="" width="100%" height="100%"><p>${movieResult.title}</p></li>`
          results.insertAdjacentHTML("beforeend", movieTag)
        })
      })
  }

  get title() {
    return this.titleTarget.value
  }
}

import { Controller } from "@hotwired/stimulus"

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

        fetch('/movies', {
          method: 'POST',
          headers:
            {
              "Content-Type": "application/json",
              "Accept": "text/html"
            },
          body: JSON.stringify({title: movieTitle})
        })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
        });
      });

    })


  }


  get title() {
    return this.titleTarget.value
  }
}

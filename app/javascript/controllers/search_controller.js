import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "title" ]

  movie() {
    const element = this.titleTarget
    const name = element.value
    console.log(`Hello, ${name}!`)
  }
}

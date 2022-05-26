Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
   root to: 'pages#home'

   get "movies/new", to: "movies#new"
   get "movies/search_movie", to: "movies#search_movie", as: :search_movie
   post "movies", to: "movies#create"

   get "user/:id/wishlist/show", to: "wishlists#show", as: :wishlist

end

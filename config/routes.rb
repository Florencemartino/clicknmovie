Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
   root to: 'pages#home'

   get "movies/new", to: "movies#new"
   post "movies", to: "movies#create"

   get "user/:id/wishlist/show", to: "wishlists#show"

end

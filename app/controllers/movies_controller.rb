class MoviesController < ApplicationController

  def new
    @movie = Movie.new
  end

  def create
    movie = Movie.new(movie_params)
    movie.save!

    user = User.find(current_user.id)

    wishlist = Wishlist.new(user_id: user.id, movie_id: movie.id)
    wishlist.save!

    redirect_to root_path
  end

  def search_movie
    @movie_title = params[:movie]
   if @movie_title
      search_params = params[:movie][:title]
      url = "https://imdb-api.com/en/API/SearchTitle/k_rvvt7xsh/#{search_params}"
      raise
   end
  end

    private

    def movie_params
      params.require(:movie).permit(:title)
    end
end

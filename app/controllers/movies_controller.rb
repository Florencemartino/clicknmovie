class MoviesController < ApplicationController

  def new
    @movie = Movie.new
  end

  def create
    movie = Movie.new(movie_params)
    movie.save!

    user = User.find(1)

    wishlist = Wishlist.new(user_id: user.id, movie_id: movie.id)
    wishlist.save!

    redirect_to root_path
  end

    private

    def movie_params
      params.require(:movie).permit(:title)
    end
end

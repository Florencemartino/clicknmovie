class MoviesController < ApplicationController
  skip_before_action :verify_authenticity_token

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
  end

    private

    def movie_params
      params.require(:movie).permit(:title)
    end
end

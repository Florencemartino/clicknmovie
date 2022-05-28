class MoviesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @movie = Movie.new
  end

  def create
    movie = Movie.new(movie_params)
    movie.save!

    user = User.find(current_user.id)

    @wishlist = Wishlist.new(user_id: user.id, movie_id: movie.id)

    respond_to do |format|
      if @wishlist.save!
        format.html { render "pages/homes" }
        format.json { render json:success_data }
      else
        format.html { render "pages/homes" }
        format.json # Follow the classic Rails flow and look for a create.json view
      end
    end
  end

  def search_movie
  end

    private

    def movie_params
      params.require(:movie).permit(:title)
    end

    def success_data
      {
        inserted_item: render_to_string(partial: 'movies/success.html')
      }
    end
end

class MoviesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @movie = Movie.new
  end

  def create

    movie = Movie.find_by(title: movie_params[:title])

    if movie.nil?
      movie = Movie.new(movie_params)
      movie.save!
    end

    user = User.find(current_user.id)

    @wishlist = Wishlist.find_by(user_id: user.id, movie_id: movie.id)

    if @wishlist.nil?
      @wishlist = Wishlist.new(user_id: user.id, movie_id: movie.id)
    end

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
      params.require(:movie).permit(:title, :imdb_id)
    end

    def success_data
      {
        inserted_item: render_to_string(partial: 'movies/success.html')
      }
    end
end

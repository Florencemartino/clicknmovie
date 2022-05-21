class WishlistsController < ApplicationController

  def show
    @user = User.find(1)
  end
end

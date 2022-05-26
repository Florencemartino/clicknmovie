class WishlistsController < ApplicationController

  def show
    @user = User.find(current_user.id)
  end
end

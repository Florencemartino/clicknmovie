class Wishlist < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :movie, dependent: :destroy
end

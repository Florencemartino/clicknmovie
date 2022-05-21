class User < ApplicationRecord
  has_many :wishlists
  has_many :movies, through: :wishlists
end

class Movie < ApplicationRecord
  validates :title, presence: true
  validates :imdb_id, presence: true, uniqueness: true
  has_many :wishlist
end

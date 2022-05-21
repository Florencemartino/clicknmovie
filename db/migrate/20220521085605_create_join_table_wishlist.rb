class CreateJoinTableWishlist < ActiveRecord::Migration[6.1]
  def change
    create_join_table :users, :movies, table_name: :wishlists
  end
end

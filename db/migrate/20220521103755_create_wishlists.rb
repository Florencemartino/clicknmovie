class CreateWishlists < ActiveRecord::Migration[6.1]
  def change
    create_table :wishlists do |t|
      t.references :movie, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

class UserEventTable < ActiveRecord::Migration[5.2]
  def change
    create_table :users_events do |t |
      t.references :user
      t.references :event
      t.boolean :bookmarked, default: false
      t.boolean :liked, default: false
    end
  end
end
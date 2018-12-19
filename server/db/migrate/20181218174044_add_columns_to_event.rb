class AddColumnsToEvent < ActiveRecord::Migration[5.2]
  def change
      add_column :events, :like_count, :integer
      add_column :events, :description, :string
      add_column :events, :start_local, :datetime
      add_column :events, :end_local, :datetime
      add_column :events, :logo_url, :string
      add_column :events, :event_url, :string
      add_column :events, :city, :string
      add_column :events, :region, :string
      add_column :events, :venue_address, :string
      add_column :events, :latitude, :string
      add_column :events, :longitude, :string
      add_column :events, :is_free, :boolean
      add_column :events, :cost, :string
  end
end

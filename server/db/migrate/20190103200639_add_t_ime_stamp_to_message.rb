class AddTImeStampToMessage < ActiveRecord::Migration[5.2]
  def change
    
  # allow null values
  add_timestamps :messages, null: true 

  # add data to exis
  long_ago = DateTime.new(2018, 1, 1)
  Message.update_all(created_at: long_ago, updated_at: long_ago)

  # change not null 
  change_column_null :messages, :created_at, false
  change_column_null :messages, :updated_at, false
  end
end

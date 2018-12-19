class MessageTable < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :message_id
      t.references :user
      t.references :event 
      t.string :content
      t.boolean :liked, default: false
      t.boolean :disliked, default: false
    end
  end
end
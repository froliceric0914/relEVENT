class Event < ApplicationRecord
  has_many :users_events
  has_many :users, through: :users_events
  has_many :messages
  belongs_to :category
end

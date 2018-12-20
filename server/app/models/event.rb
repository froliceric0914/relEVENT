class Event < ApplicationRecord
  has_many :users_events
  has_many :users, through: :users_events
  has_many :messages
  belongs_to :category
  # chat
  has_many :messages, dependent: :destroy
  has_and_belongs_to_many :users
end

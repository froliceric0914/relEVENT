class User < ApplicationRecord
  has_secure_password
  has_many :users_events
  has_many :events, through: :users_events
  # for chat
  has_and_belongs_to_many :conversations, dependent: :destroy
end

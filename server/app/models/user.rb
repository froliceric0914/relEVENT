class User < ApplicationRecord
  has_secure_password
  has_many :users_events
  has_many :events, through: :users_events
  has_many :messages

  validates :username, presence: true,  uniqueness: true 
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 7 }, confirmation: true

  def self.authenticate_with_credentials(email, password)
      user = User.find_by_email(email) 
      # puts user

      if user && user.authenticate(password)
        user
      else
        nil
      end
  end 

end
